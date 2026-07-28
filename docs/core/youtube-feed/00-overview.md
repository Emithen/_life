# youtube-feed — 개요 (지도)

> 기준: youtube-feed `600a298` · 2026-07-28

## 한 줄

관심 유튜브 채널의 최신 영상을 모아 **폰에서 열어보는 정적 사이트**.
"내가 만들어서 내가 쓴다"가 목표라 서버·계정 없이 무료로 굴러가게 설계했다.

- 라이브: https://emithen.github.io/youtube-feed/
- 코드: `Emithen/youtube-feed` (public)

## 저장소가 2개다 (중요 — 자주 헷갈리는 지점)

| 저장소 | 역할 | 배포 관여 |
|---|---|---|
| `Emithen/_life` | 학습 노트·저널·문서 (지금 이 문서가 있는 곳) | ❌ 없음 |
| `Emithen/youtube-feed` | **실제 서비스 코드 전부.** 유일한 원본 | ✅ 여기서만 |

로컬에선 `_life/youtube-feed/`에 clone돼 있고 `_life`의 `.gitignore`로 제외돼 있다(중첩 저장소).
→ **코드를 고칠 땐 항상 `youtube-feed` 쪽을 고친다.**

## 배포 구조

```
youtube-feed [main 브랜치]  ← 재료: index.html, app.js, workflow
        │
        │  트리거: main에 push  (cron은 2026-07-28에 중단)
        ▼
   GitHub Actions (임시 리눅스) — 지금은 배포만 함
        ▼
youtube-feed [gh-pages 브랜치]  ← 결과물만 쌓이는 출판 전용 (직접 건드릴 일 없음)
        │
        ▼
   GitHub Pages 가 웹에 게시 → 폰 브라우저
        │
        └─ 페이지가 열리면 app.js가 내 Worker를 불러 영상 목록을 실시간으로 받아옴
```

- 서버가 상시 떠 있지 않다 → **무료·관리 0**.
- 영상 목록은 **페이지를 열 때마다 실시간**으로 가져온다 (Worker 경유).

## 데이터 경로 — 지금은 하나뿐 (2026-07-28 변경)

| | 내 채널 (현재 유일) | ~~추천 채널 (프리셋 9개)~~ **중단됨** |
|---|---|---|
| 언제 수집 | **볼 때** (브라우저에서 즉시) | ~~미리 (Actions, 3시간마다)~~ |
| 만든 주체 | `app.js` + 내 Worker | ~~`collect.py` (서버)~~ |
| 저장 위치 | `localStorage` (그 브라우저에만) | ~~`data.json`~~ |
| 아키텍처 유형 | L3+L4 (요청시 동적 + 클라 개인화) | ~~L2 (주기 갱신 정적)~~ |

추천 채널은 "지금 필요 없다"고 판단해 **화면에서 빼고 수집도 멈췄다**.
`collect.py`·`data.json`은 **삭제하지 않고 저장소에 보관** 중이고,
`collect.yml`의 주석만 풀면 되살아난다. → 두 경로를 비교한 설명은 `10-flow-and-contracts.md`

자세히: `10-flow-and-contracts.md` · 유형 정의: `../../service-architecture-types.md`

## 파일별 역할

| 파일 | 하는 일 |
|---|---|
| `index.html` | 손으로 쓴 정적 껍데기 (CSS + 채널 추가 폼) |
| `app.js` | localStorage의 내 채널을 Worker로 가져와 렌더 |
| `worker/rss-proxy.js` | 내 전용 RSS 릴레이 (Cloudflare Worker) — 채널 해석·파싱 담당 |
| `.github/workflows/collect.yml` | push 시 gh-pages 게시 (워크플로 이름은 `publish`) |
| `ROADMAP.md` | 앞으로의 방향 + "언제 다음 단계로 갈지" 신호등 |
| ~~`collect.py`~~ | 휴면. 채널 9개 RSS 수집 → `data.json` 생성 (지금 실행 안 됨) |
| ~~`data.json`~~ | 휴면. 마지막 수집 결과가 남아 있음 (화면이 읽지 않음) |

## 지금 상태 (2026-07-28)

- ✅ 계약 v1 완료 — `collect.py`는 데이터만, 화면은 `app.js`가 렌더 (데이터/뷰 분리)
- ✅ 개인화 국면 A — localStorage로 내 채널 직접 추가 (링크·@핸들·채널ID)
- ✅ **릴레이 내재화 완료** — 공개 프록시 전부 제거, 내 Cloudflare Worker로 전환
  - 주소: `https://yt-rss.javer1155.workers.dev` (코드: `worker/rss-proxy.js`)
  - @핸들 추가 **~20초 → ~1초**, "3연속 실패" 해소
- 🔜 다음 후보: 화면 필터·정렬·검색(계약 위에서 자유롭게), 새 영상 강조,
  여러 기기 동기화가 아파지면 L5(인증+DB)

## 설계 원칙 (판단이 필요할 때 기준)

1. **필요한 것만 그때그때. 아프기 전엔 도입 안 한다.** (프레임워크·백엔드 다 이 기준으로 보류 중)
2. **계약을 밖에 둔다.** 파이썬↔화면은 `data.json` 모양으로만 대화 → 한쪽을 바꿔도 다른 쪽 무사.
3. **남의 서비스는 반드시 가끔 실패한다.** 채널 하나 실패해도 나머지는 나오게 짠다.
4. **무료·무관리를 최대한 오래 유지한다.**
