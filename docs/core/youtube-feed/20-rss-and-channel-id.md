# RSS와 channel_id 플로우

> 기준: youtube-feed `3b7f8cb` · 2026-07-30

## 1. RSS란

**사이트가 "최신 글/영상 목록"을 기계가 읽으라고 공개해두는 표준 파일.**
사람용 웹페이지(예쁘고 무겁고 JS 덩어리) 대신, 기계용 목록(단순·고정 구조).

유튜브는 채널마다 공개한다:
```
https://www.youtube.com/feeds/videos.xml?channel_id=UC....
```

### 왜 RSS를 골랐나 (YouTube Data API 대신)

- **API 키가 필요 없다** — 키 발급·쿼터·브라우저 노출 문제가 통째로 사라짐
- **공식 경로라 안정적** — 페이지 긁기는 디자인이 바뀌면 깨지지만 RSS 구조는 거의 안 변함
- **가볍다** — 채널 페이지 ~1MB vs RSS ~20KB
- **데이터센터 IP에서도 잘 열린다** — GitHub Actions에서 도는 `collect.py`에 중요

## 2. RSS 구조 → 우리 JSON

```xml
<feed>
  <title>코딩애플</title>              ← 채널 이름 (첫 <entry> 앞쪽)
  <entry>                              ← 영상 1개 (최신순, 보통 15개)
    <title>진정한 남자는...</title>       ← 영상 제목
    <link rel="alternate" href="https://www.youtube.com/watch?v=RrYPBkmnUwc"/>
    <published>2026-07-22T03:04:59+00:00</published>
  </entry>
  ...
```

| RSS 위치 | → 우리 필드 |
|---|---|
| 첫 `<entry>` 앞의 `<title>` | `name` |
| `<entry>`의 `<yt:videoId>` | `videos[].id` (본 영상 기록의 열쇠) |
| `<entry>`의 `<title>` | `videos[].title` |
| `<entry>`의 `<link rel="alternate" href>` | `videos[].link` |
| `<entry>`의 `<published>` 앞 10글자 | `videos[].date` (표시용) |
| `<entry>`의 `<published>` 전체 | `videos[].published` (24시간 이내 판단용) |

### ⚠️ 유튜브의 실제 버그 하나

`<feed>` 머리의 `<yt:channelId>`는 **앞의 `UC`가 빠져 있다** (`SLrpBAzr-...`).
엔트리 안에는 제대로 `UCSLrpBAzr-...`로 들어있다.
→ 그래서 코드는 **channel_id를 RSS에서 읽지 않고 입력에서 확정한 값을 쓴다.**
교훈: 남의 데이터는 항상 조금씩 이상하다. 신뢰할 필드를 좁게 잡는다.

## 3. "채널 특정" 플로우 — 왜 변환이 필요한가

핵심 제약 하나에서 전부 파생된다:

> **RSS 주소는 `channel_id`(UC로 시작)만 받는다. `@핸들`은 안 받는다.**

사용자는 링크나 `@핸들`을 붙여넣으므로 변환이 필요하다 (`resolveChannelId`).

```
입력
 ├─ 1) "UCabc..." 형태?            → 그대로 사용         (정규식 /^UC[\w-]{20,}$/)
 ├─ 2) URL에 "/channel/UC..."?     → 잘라냄
 └─ 3) "@핸들" / 커스텀 URL?        → ⚠️ 채널 페이지(2.4MB)를 받아 HTML에서 추출
        └ 우선순위: rel="canonical" → "externalId" → "channelId"(최후)
           찾을 땐 indexOf로 위치만 잡고 그 뒤 40글자만 검사 (CPU 절약)
   ↓
channel_id 확정 → RSS 주소 조립 → 수집 → 파싱
```

**3번이 왜 "긁기"뿐인가**: 유튜브는 공식 API 없이 `@핸들 → channel_id` 변환을 제공하지 않는다.
그래서 페이지 HTML에 들어있는 값을 찾아 쓴다. → **가장 느리고 약한 지점.**

⚠️ **함정 두 개 (둘 다 실제로 터짐 — `90-gotchas.md` 8·9번)**
1. 페이지 안엔 **추천 채널의 ID도 6~12개** 들어있다. 먼저 나오는 `"channelId"`를 집으면
   엉뚱한 채널이 잡힌다(`@mkbhd`→The Studio). → **`canonical`이 그 페이지의 진짜 주인.**
2. 2.4MB 전체에 정규식을 돌리면 Worker CPU 한도(10ms)를 넘겨 죽는다. → `indexOf`로 좁힌 뒤 검사.

### 그래서 Worker가 큰 개선인 이유

이 1MB 긁기를 **브라우저(폰+공개 프록시)가 아니라 Cloudflare 서버가** 수행:
- 실측 **~20초 → ~1초**
- 결과를 1시간 캐시 (`@핸들 → ID`는 절대 안 바뀌므로 안전)

## 4. 배포용 collect.py가 핸들 긁기를 아예 뺀 이유

배포하면 수집 주체가 집 IP가 아니라 **GitHub 데이터센터 IP**다. 페이지 긁기는 차단당하기 쉽다.
`channel_id`는 채널마다 절대 안 바뀌므로 → **한 번 뽑아 상수로 박고 RSS만 읽는다.**
(그래서 `CHANNELS` 리스트에 UC 값이 하드코딩돼 있다.)
