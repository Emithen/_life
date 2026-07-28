# 겪은 함정들 (실제로 터진 것만)

> 기준: youtube-feed `d0e4b93` · 2026-07-28
> 전부 실제로 겪고 고친 것. 같은 실수를 반복하지 않으려고 남긴다.

## 1. `.gitignore`가 배포 결과물을 삼켜 404 (2026-07-24)

`actions-gh-pages`가 `publish_dir: .`을 올릴 때 **저장소의 `.gitignore`를 그대로 따른다.**
→ `index.html`을 무시하면 사이트에서 빠져 **404**.

- **그래서**: 생성물이지만 `index.html`·`data.json`은 **추적한다**(커밋한다).
- `youtube-feed/.gitignore`에 이 경고가 주석으로 박혀 있다. 지우지 말 것.
- 정석 해법(나중에): 출력을 `dist/`로 보내고 `publish_dir: dist`로 분리.

## 2. 모바일 버전 불일치 — 캐시 (2026-07-28)

폰에서 `Cannot read properties of null (reading 'replaceChildren')`.
원인: **새 `index.html` + 캐시된 옛 `app.js`** 조합. 옛 코드가 사라진 `#app`을 찾다 터짐.

- **해결**: `<script src="app.js?v=2">` — 캐시 버스팅. **`app.js` 고칠 때 숫자를 올린다.**
- 추가 방어: `app.js`가 대상 엘리먼트 없으면 크래시 대신 조용히 스킵.
- 실무에선 빌드 도구가 파일명에 해시를 붙여 자동화하는 영역.

## 3. Mac↔Windows 인코딩 (2026-07-24)

- `git pull`에서 한글 파일명이 `\354\240\225...`로 보이는 건 **버그가 아니라** `core.quotepath` 기본값.
  → `git config core.quotepath false`
- `.gitattributes`로 텍스트 줄바꿈 **LF 고정** (두 기기 설정과 무관하게 저장소가 우선)
- `__pycache__/*.pyc`가 추적되고 있었음 → 기기별 바이너리 충돌 원인. 제거 + `.gitignore`
- `collect.py`: stdout UTF-8 강제 + `open(..., newline="\n")`
- **한글 파일명을 전부 영문화**해 문제를 뿌리째 제거

## 4. 서브 채널로 새던 channel_id (2026-07-23)

`find_channel_id`의 정규식 **패턴 순서** 때문에 추천·서브 채널 ID를 잡아옴 → 3개 채널이 엉뚱한 피드.
- **해결**: `externalId`/`canonical`을 우선 매칭. 하드코딩 값을 전부 재검증.
- 교훈: HTML에서 정규식으로 값 뽑을 땐 **어떤 패턴이 먼저 맞는지**가 정확도를 좌우한다.

## 5. `_life`에 남아있던 옛 코드 사본 (2026-07-28 정리됨)

`_life/collector/`에 `collect.py` 사본이 있어 "어느 쪽이 진짜냐"로 혼란.
- **해결**: 코드는 `youtube-feed`에만. `_life`엔 노트·문서만.
- 교훈: **같은 파일이 두 곳에 살면 반드시 한쪽이 낡는다.**

## 6. 공개 프록시는 언제든 죽는다 (2026-07-28)

개발 중 allorigins가 500. curl로는 실패하는데 브라우저에선 되는 프록시도 있었다
(프록시가 Origin 헤더 유무로 다르게 동작) → **프록시 검증은 실제 브라우저 환경에서 해야 한다.**

## 7. 유튜브 RSS의 `UC` 프리픽스 누락

`<feed>` 머리의 `<yt:channelId>`엔 `UC`가 빠져 있다. 엔트리 안에는 정상.
→ channel_id는 RSS에서 읽지 말고 **입력에서 확정한 값**을 쓴다.

## 8. 채널 페이지에서 엉뚱한 채널 ID를 집음 — **4번의 재발** (2026-07-28)

Worker에서 `@핸들 → channel_id`를 찾을 때 **첫 `"channelId"`**를 집었더니 추천 채널이 잡혔다.
- `@mkbhd` → The Studio ❌ / `@veritasium` → 프랑스어판 ❌ (페이지 안에 UC가 6~12개나 들어있음)
- **해결 순서**: `rel="canonical"` 링크(페이지의 진짜 주인) → `"externalId"` → `"channelId"`(최후)
- 교훈: 4번과 **정확히 같은 실수를 5일 만에 반복**했다. 남의 HTML에서 값을 뽑을 땐
  "먼저 나오는 것"이 아니라 **"의미상 권위 있는 것"**을 골라야 한다.

## 9. Worker CPU 한도 초과 → `Failed to fetch` (2026-07-28)

유튜브 채널 페이지는 **2.4MB**. 정규식으로 전체를 훑으니 Worker CPU 한도(10ms)를 넘겨 죽었고,
그 경우 Cloudflare가 CORS 헤더 없는 에러 페이지를 반환해 브라우저엔 `Failed to fetch`로 보인다.
- **해결**: `indexOf`(네이티브 검색)로 위치만 찾고 그 뒤 40글자만 정규식 검사.
- 교훈: 큰 문자열에 정규식을 함부로 돌리지 않는다. `Failed to fetch`는 **CORS 헤더가 없는 응답**의 증상이기도 하다.

## 10. `Vary: Origin` 누락 — 캐시가 CORS를 깨뜨림 (2026-07-28)

응답의 `Access-Control-Allow-Origin`은 요청 Origin마다 다른데 `Vary: Origin`이 없었다.
→ **localhost에서 만든 응답이 캐시되어 github.io 요청에 재사용** → ACAO 불일치 → `Failed to fetch`.
- **해결**: `Vary: Origin` 추가.
- 함께: 에러 응답은 `Cache-Control: no-store`. 안 그러면 일시적 장애가 10분간 굳는다.
- 교훈: **응답 헤더가 요청에 따라 달라지면 반드시 `Vary`를 붙인다.**

## 11. 수정 직후의 "안 고쳐졌는데?" 착시 (2026-07-28)

Worker를 고쳐 배포했는데 브라우저에선 여전히 옛 결과가 나왔다.
- 원인 ①: 응답 `max-age=600` 때문에 **브라우저가 10분간 옛 응답을 보관**. (`{cache:"reload"}`로 확인 가능)
- 원인 ②: Cloudflare 배포 **전파에 ~20초**. 배포 직후 즉시 확인하면 옛 코드가 응답한다.
- 교훈: 배포 직후 검증은 **캐시 우회 + 잠깐 대기** 두 가지를 챙긴다.

## 12. GitHub Actions Node 20 지원 종료 경고 (미해결·무해)

`actions/checkout@v4`, `actions/setup-python@v5`가 Node 20 대상이라 경고가 뜬다.
지금은 강제로 Node 24에서 돌아 문제없음. 언젠가 액션 버전을 올리면 사라진다.
