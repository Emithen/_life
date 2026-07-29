# 미래 준비 진행 노트

> 시작일: 2026-07-20
> 목적: "되고 싶은 미래"를 향한 노력 0인 상태 극복. 하루 25분, 유튜브 전에 먼저.

## 지금까지 정리된 것

- 상황: 취준·이직 준비 중. 준비 노력을 거의 못 하고 있음.
- 패턴: 시간이 없어도 유튜브 시청 → 회피 신호로 진단. 게으름 아님, 구조 문제.
- 관심 단서: 체스·문명(전략/시스템 사고 선호), 요리(보기만 함 = 시작 문턱 미돌파)
- 합의된 방법: 하루 25분, 유튜브 켜기 전에 미래 준비 먼저. "0이 아닌 날" 쌓기.

## 되고 싶은 미래들 (계속 채우는 중)

- **자급자족 메이커** (2026-07-20): 흥미가 생긴 분야를 쉽게 공부하게 돕는 도구, 관심 분야 정보를 모아주는 서비스를 직접 만들어서 직접 쓰는 사람. "내가 만들어서 내가 쓴다."
- **핵심 동기** (2026-07-20): 나의 성장 속도를 스스로 가속하는 사람. 컴공 전공을 택한 이유도 이것 — 성장을 가속하는 도구를 직접 만들어 쓰는 미래.

## 25분 일일 계획

**출발점**: 작은 프로젝트를 만들어본 경험 있음 → 강의부터가 아니라 프로젝트부터. 필요한 것만 그때그때 배운다.

**첫 프로젝트: 나만의 정보 수집기 (MVP)**
관심 주제의 유튜브 채널·블로그 새 글을 모아 하루 한 번 목록으로 보여주는 도구.

1주차:
- Day 1: 수집 대상 정하기 — 관심 주제 1개, 채널/사이트 3~5개 목록 작성
- Day 2: 환경 준비 — 프로젝트 폴더, Python(또는 선호 언어) 실행 확인
- Day 3~5: 유튜브 채널 RSS에서 새 영상 제목+링크 가져와 출력하기

2주차:
- 블로그/뉴스 RSS 추가, 결과를 마크다운/HTML 파일로 저장
- 여유 되면: 매일 자동 실행, 요약 붙이기

규칙: 하루 25분, 유튜브 전에. 막히면 멈추지 말고 "어디서 막혔는지"만 기록해도 그 날은 성공.

## 개선 계획 (다음 25분들)

지금 상태: 9개 채널의 최신 영상을 터미널에 출력함. 여기서부터 "매일 쓰고 싶은 도구"로 키우는 순서.

- **Day 5 — 결과를 파일로 저장**: 화면 출력 대신 `오늘의영상.md`(또는 .html) 파일로 저장. 그래야 터미널 안 켜도 열어봄. (핵심 학습: 파일 쓰기)
- **Day 6 — 채널 목록 분리**: CHANNELS를 코드 밖 `channels.txt`로 빼서, 코드 안 건드리고 채널 추가/삭제. (핵심 학습: 파일 읽기)
- **Day 7 — "새 것만" 표시**: 지난번 실행 때 본 영상은 빼고 진짜 새 영상만 보여주기. (핵심 학습: 상태 저장)
- **여유 되면**:
  - 하루 한 번 자동 실행 (Windows 작업 스케줄러)
  - 영상 제목 옆에 올라온 날짜/시간 표시
  - 블로그·뉴스 RSS도 추가 (원래 2주차 목표)
  - 제목만 보고 한 줄 요약 붙이기

원칙 유지: 하루 25분, 유튜브 전에. 한 번에 하나씩. 막히면 "어디서 막혔는지"만 적어도 성공.

## 언젠가 만들고 싶은 것 (아이디어 보관함)

지금 당장은 아니지만, 잊지 않으려고 적어두는 목록. 여유가 생기거나 현재 프로젝트가
끝나면 여기서 꺼내 쓴다.

- **체스 복기 도우미** (2026-07-26 기록):
  Lichess API로 내 대국을 내려받아, **진 판을 갈래별로 묶어 "어디서 자주 무너지는지"**를
  보여주는 도구. 오프닝별/시간대별/수순별 패배 패턴 집계.
  - 왜 나한테 맞나: 체스·문명을 좋아하는 이유가 전략·시스템 사고라서, 만드는 재미와
    쓰는 재미가 같은 방향. "내가 만들어서 내가 쓴다"에 정확히 부합.
  - 기존 자산 재활용: youtube-feed와 뼈대가 같음 — 수집(API) → 저장 → HTML → Actions 자동화.
    RSS가 아니라 JSON API라는 점만 다름.
  - 첫 삽 후보: Lichess `/api/games/user/{username}` 로 최근 대국 N판 받아서
    승/패/무 개수만 세어 출력 (하루 25분 분량).
  - 우선순위: 낮음(흥미 쪽). 취준에 직접 도움되는 **채용공고 수집기**가 먼저.

## 진행 기록

| 날짜 | 한 일 (25분) | 메모 |
|------|-------------|------|
| 2026-07-20 | Day 1 완료: 수집 주제 확정 — 포챔스, 체스, 문명6, 프로그래밍 | 첫 "0이 아닌 날". 다음: 주제별 구체 채널 정하기 + 환경 준비 |
| 2026-07-20 | Day 2 완료: 채널 9개 확정(channels.md), 프로젝트 폴더 생성, Python 3.10 확인 | 2일 연속! 다음(Day 3): @핸들 → channel_id 변환, RSS로 새 영상 제목+링크 가져오기 |
| 2026-07-22 | Day 3 완료: collect.py 작성 — 코딩애플 채널 @핸들→channel_id 변환 성공, RSS로 최신 영상 5개 제목+링크 출력 확인 | MVP 핵심 동작 완성! 채널 하나 됨 = 나머지는 반복. 다음(Day 4): 채널 목록을 리스트로 만들어 9개 전부 반복 출력하기 |
| 2026-07-22 | Day 4 완료: CHANNELS 리스트 + 반복문으로 9개 채널 전부 출력. 한글 @핸들 URL 인코딩 버그 잡음(urllib.parse.quote). try/except로 실패해도 안 멈춤 | MVP 완성! 하루 만에 Day 3~4. 다음 개선 계획은 아래 "개선 계획" 참고 |
| 2026-07-23 | 다른 기기에서 배포계획.md 작성(GitHub Actions+Pages로 폰에서 보기) + git 동기화. 배포용 channel_id 9개 하드코딩. find_channel_id 패턴 순서 버그 잡음(externalId/canonical 우선 → 추천·서브 채널 오인식 해결). 하드코딩값 검증해 서브 채널로 새던 3개(모노·눈파티·체스인사이드) 바로잡음 | channel_id는 안 바뀌니 이제 배포용 목록 확정. 다음: collect.py를 배포 뼈대대로 리팩터링(핸들 긁기 제거→UC상수+RSS만) + build_html() 추가 |
| 2026-07-23 | collect.py 배포 뼈대대로 리팩터링: 핸들 긁기(find_channel_id/get_html) 제거→channel_id 상수 9개+RSS만. latest_videos에 날짜 추가, build_html() 추가해 index.html 저장. 로컬 실행 성공(9채널 전부, 실패 0) | 배포 체크리스트 앞 3개 완료. 다음: (선택)HTML에 모바일용 CSS → 또는 GitHub public 저장소 만들어 push + collect.yml 추가 |
| 2026-07-23 | 🚀 배포 완료! public 저장소 Emithen/youtube-feed 생성 → collect.py + .github/workflows/collect.yml 올림 → Actions 쓰기권한 켜고 워크플로 수동 실행(23초 성공) → gh-pages 브랜치로 Pages 활성화 | 폰에서 볼 수 있는 실사이트 완성: https://emithen.github.io/youtube-feed/ · 앞으로 3시간마다 자동 갱신(cron). 다음(여유되면): 모바일용 CSS, 새 영상 강조, 마지막 갱신 시각 표시 |
| 2026-07-24 | Mac↔Windows 인코딩 문제 정리(옵션 C): ① git pull의 한글 파일명 octal 표시는 버그 아니라 quotepath 기본값 → `core.quotepath false`. ② `.gitattributes`(줄바꿈 LF 고정)+`.gitignore` 추가로 두 기기 동작 통일. ③ 추적되던 `__pycache__/*.pyc`(Mac 3.10 바이너리) 제거. ④ collect.py에 stdout UTF-8 강제 + open에 newline="\n". ⑤ 한글 파일명 전부 영문화(정보수집기→collector, 진행노트→journal.md, 배포계획→deploy-plan.md) | 인코딩 잡음 뿌리째 제거. ⚠️ collect.py 개선은 배포 저장소(Emithen/youtube-feed)에도 복사해야 라이브 반영됨. Windows 쪽에선 clone 후 `git config core.quotepath false` 한 번 |
| 2026-07-24 | "마지막 갱신 시각 표시" 완료: build_html()에 `datetime.now(timezone(timedelta(hours=9)))`로 KST 시각 만들어 `<h1>` 밑에 "업데이트: YYYY-MM-DD HH:MM (KST)" 줄 추가. 로컬 실행해 index.html에 시각 뜨는 것 확인 | 하루 2건! GitHub Actions는 UTC라 KST 보정한 게 포인트. ⚠️ 이것도 배포 repo(Emithen/youtube-feed)에 반영해야 라이브에 뜸. 다음(여유되면): 모바일용 CSS, 새 영상 강조 |
| 2026-07-24 | repo 구조 정리 + 시인성 개선: ① collector 중복본을 youtube-feed repo로 일원화(_life는 journal/메모만, youtube-feed/는 gitignore로 중첩) → 이제 복사 없이 한 곳에서 고치고 push. ② build_html() `<head>`에 `<style>` 한 블록 추가(max-width·line-height·채널 border-left·링크 굵게·color-scheme 다크모드). f-string이라 중괄호 `{{ }}` 이스케이프 | 하루 3건! 시인성 확 개선. 검증: /tmp에서 collect.py 실행해 style·KST·9채널 정상 생성 확인. ⚠️ youtube-feed에 push해야 라이브 반영(트리거 push 없으면 Actions "Run workflow" 수동). 다음(여유되면): push 트리거 추가, 새 영상 강조 |
| 2026-07-26 | ROADMAP 1단계(템플릿 분리) 완료: build_html()에 통짜로 박혀 있던 HTML/CSS를 `template.html`로 빼냄. collect.py는 `{{TITLE}}`·`{{UPDATED}}`·`{{BODY}}` 토큰만 `.replace()`로 채움. str.format이 아니라 replace라 그동안 괴롭던 CSS 중괄호 `{{ }}` 이스케이프가 통째로 사라짐. os.path로 template을 __file__ 옆에서 읽어 실행 위치 무관 | 이제 "화면 고칠 때 파이썬 안 건드림"의 토대 완성. 검증: collect.py 실행→생성된 index.html이 이전 커밋본과 시각 줄 빼고 **바이트 동일**(diff 0). youtube-feed에 커밋함(0aadee7). ⚠️ push해야 라이브 반영. 다음(여유되면): 새 영상 강조, push 트리거, ROADMAP 2단계(data.json 분리) |
| 2026-07-26 | (하루 추가분) ① 인터페이스 관점 정리: 파이썬↔화면 사이 "계약"을 명시하는 아이디어를 ROADMAP 섹션0에 v0(오늘 template 토큰)→v1(data.json 스키마)로 재서술. 계약을 밖에 두면 수집기 언어·미들웨어 교체가 공짜가 된다는 보상까지 명시(fdfbc1a). ② push 트리거 추가: collect.yml에 `on: push(branches: main)` → 코드 push하면 즉시 자동 갱신, "수동 Run workflow" 마찰 제거. gh-pages push는 트리거 안 돼 무한루프 없음(93cc847) | 하루에 3건(리팩터·문서·CI)! push 트리거의 첫 수혜자가 오늘 쌓인 커밋들. ⚠️ 아직 로컬 커밋만 — push하면 자동 갱신 사이클 완성. 다음: 새 영상 강조(v1 data.json 위에서 하면 깔끔) |
| 2026-07-28 | ROADMAP 2단계=계약 v1 완료: collect.py에서 `build_html` 제거→`data.json`({updated, sections[...]})만 생성. `index.html`은 정적 껍데기로 바꾸고 `app.js` 신설해 `fetch("data.json")`→DOM 렌더(createElement/textContent로 XSS 안전). `template.html` 삭제. 파이썬↔화면 의존성이 JSON 한 장으로 완전히 끊김. push→Actions 성공→gh-pages→**라이브에서 fetch 정상**(업데이트 시각이 로컬보다 최신=Actions 생성분)까지 확인(youtube-feed 1f13e40) | 데이터/뷰 분리 달성. 세션 초반 함정: `_life`가 한 세대 전 상태인 걸 착각→시작 시 git log/status부터 확인하기로. `.gitignore`의 "index.html 무시하면 404" 교훈 덕에 data.json도 추적 처리. 다음(여유되면): 화면에 필터·정렬·검색(갈래1 확장), 새 영상 강조, Actions Node20 경고로 액션 버전업 |
| 2026-07-28 | (하루 추가분 ②) 개인화 국면 A + 릴레이 내재화: ① **사용자가 직접 채널 추가** UX(링크/@핸들/채널ID) — localStorage에 내 채널+캐시, 채널명 자동추출·삭제·내채널/추천 구분 렌더. ② CORS 때문에 릴레이가 필요한데 공개 프록시가 "3연속 실패"를 내서 **내 Cloudflare Worker**(`worker/rss-proxy.js`)로 전환, 공개 프록시 전부 제거 → @핸들 추가 **~20초→~1초**. ③ 라이브 검증에서 진짜 버그 3개 발견·수정: 첫 `"channelId"`를 집어 추천 채널이 잡히던 문제(@mkbhd→The Studio, @veritasium→프랑스어판) → **canonical 우선**, 2.4MB에 정규식 돌려 Worker CPU 한도 초과 → **indexOf로 좁히기**, **`Vary: Origin` 누락**으로 localhost 응답이 라이브에 재사용돼 CORS 실패 → Vary 추가 + 에러는 no-store | 라이브 최종 확인: @fireship·@3blue1brown·@LinusTechTips **3연속 전부 성공, 채널ID 정확, 0.8~2초**. ⚠️ 채널ID 오인식은 7/23 "서브 채널로 새던" 버그의 **5일 만의 재발** — docs/core/90-gotchas에 8·9·10·11번으로 기록. Worker 수정은 대시보드 붙여넣기+Deploy(전파 ~20초) |
| 2026-07-28 | (하루 추가분 ③) `/guide`·`/core` 스킬 신설 — 같은 질문 반복 시 코드 재탐색 없이 미리 정리한 `docs/core/`에서 답해 일관성+토큰 절약. 개요만 기본 로드하고 주제 질문일 때만 해당 문서 1개 추가 로드(2단 구조), 문서에 기준 커밋을 박아 낡으면 갱신 제안(캐시 무효화). `/core`는 프로젝트 선택형(youtube-feed·claude-code-mastery) | `/help`는 Claude Code 내장 명령과 충돌해 `/guide`로 명명. 문서 6장 작성. 새 스킬은 세션 새로 시작해야 슬래시로 인식됨 |
| 2026-07-28 | (하루 추가분 ④) 추천 채널 기능 제거(범위: UI 제거 + 수집 중단, 코드는 보관): ① app.js에서 `renderPresets` 삭제 → data.json 요청 0회. ② index.html에서 `#preset`과 data.json 기반 "업데이트 시각" 줄 제거, `app.js?v=4`. ③ collect.yml의 cron·collect.py 스텝 주석 처리(push 시 정적 배포는 유지), 워크플로 이름 `publish`로. ④ **빈 상태 안내 추가** — 추천 채널이 채워주던 첫 화면이 비게 되므로 "아직 추가한 채널이 없어요" 문구 | 사이트가 순수 L3+L4(실시간 수집+클라 개인화)로 단순해짐. collect.py·data.json은 **삭제 안 하고 보관** → collect.yml 주석만 풀면 복구. 라이브 검증: data.json 요청 0, 빈 상태 표시, @fireship 추가 정상 |
| 2026-07-30 | youtube-feed 개선 3회차: ① **링크 공유 카드** — OG 태그(og:title/description/url/image+크기·alt, twitter:card) 추가, 1200x630 카드 이미지를 SVG로 디자인해 rsvg-convert로 PNG 변환(og:image는 SVG 미지원 플랫폼 많음), 파비콘은 파일 없이 인라인 SVG data URI. ② **Worker 계약 확장** — videos에 `id`(yt:videoId)·`published`(전체 시각) 추가. 기존 필드는 그대로 두고 **추가만** 해서 구버전 화면이 안 깨지게. ③ **본 영상 표시** — 클릭 시 자동 기록 + ✓/○ 수동 토글, 흐리게 처리, 상한 1000개. 채널당 3→6개. ④ **NEW 배지** — published 기준 24시간 이내. 본 영상이면 배지를 감춤(본 것 우선) | 배포 순서 리스크를 폴백으로 해소: `videoKey()`가 Worker의 id가 없으면 링크에서 뽑고, **그 값이 실제 videoId와 같아** Worker 재배포 전후로 기록이 어긋나지 않음 → Worker/화면을 따로 배포해도 안전. 세션 중 브라우저 도구 장애로, isNew는 실코드 경계값 테스트(23.9h/24.1h/잘못된 입력)와 **최소 DOM 스텁으로 sectionEl 직접 실행**해 검증(배지 생성·숨김·복귀·자동기록). 시각 확인은 폰에서 완료 — 배지 정상 표시 |
