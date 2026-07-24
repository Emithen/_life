# 정보수집기 웹 배포 계획

> 목표: `collect.py`(유튜브 채널별 최신 영상 수집)를 웹에 올려서 **폰이나 다른 기기로 열어 결과를 보고, 제목을 눌러 유튜브로 이동**할 수 있게 한다.
> 작성 시점 기준으로 정리한 인수인계 문서. 집 데스크탑에서 이어서 진행할 것.

---

## 0. 현재 상태 / 배경

- `collect.py`: 채널 목록을 돌면서 `@핸들` 페이지를 긁어 `channel_id(UC...)`를 찾고, 그 id로 RSS를 읽어 최신 영상 제목+링크를 출력하는 스크립트.
- 로컬(맥)에서는 정상 동작 확인됨.
  - 참고: 예전에 `SSL: CERTIFICATE_VERIFY_FAILED` → python.org 파이썬의 `Install Certificates.command` 실행으로 해결.
  - 예전에 `nodename nor servname` 에러 → 일시적 네트워크 끊김이었고, 재실행하면 정상.

---

## 1. 배포 방식 후보 (3가지)

| 방식 | 성격 | 장점 | 단점 |
|---|---|---|---|
| **① Streamlit Community Cloud** | 열 때마다 실시간 수집 | 무료, 인터랙션 가능 | 로딩 느림, 데이터센터 IP 차단 위험 |
| **② GitHub Actions + Pages** ⭐ | 주기적으로 미리 수집해 정적 HTML 게시 | 무료, 폰에서 즉시 로딩, 서버관리 0 | 실시간 아님(마지막 실행 시점 기준) |
| **③ Artifact 등 정적 페이지** | 지금 이 순간 스냅샷 | 30초면 끝, 설정 불필요 | 자동 갱신 안 됨 |

**채택: ②번 (GitHub Actions + GitHub Pages)** — "폰으로 편하게 최신 영상 챙겨보기"에 가장 적합.

---

## 2. ②번 데이터 흐름

```
① [cron 스케줄]  "3시간마다 실행해!"
        ↓
② [GitHub Actions]  임시 리눅스 생성 → 코드 내려받기 → python 설치
        ↓
③ [collect.py 실행]  channel_id → RSS → 최신 영상 수집
        ↓
④ [index.html 생성]  제목/링크를 <a href> 웹페이지로 변환
        ↓
⑤ [GitHub Pages 공개]  https://아이디.github.io/저장소/ 로 게시
        ↓
⑥ [폰 브라우저]  완성된 페이지 열람 → 제목 클릭 → 유튜브 이동
```

### 알아둘 점
- **데이터 저장소 없음**: 매번 `index.html`을 통째로 덮어씀 (항상 최신 1버전).
- **비용**: public 저장소면 Actions + Pages 모두 무료. 스크립트가 몇 초라 한도 걱정 없음.
- **실시간 아님**: 폰에서 보는 건 마지막 실행 시점 결과. 더 자주 보려면 cron 주기만 조정.
- **⚠️ 핵심 주의점**: 수집 주체가 집 IP가 아니라 **GitHub 데이터센터 IP**. 유튜브가 데이터센터 IP를 막을 수 있음. 특히 `@핸들 페이지`를 긁어 `channel_id`를 찾는 부분이 취약.
  - **해결**: `channel_id`는 채널마다 **절대 안 바뀜** → 한 번만 뽑아 코드에 박아두고, 이후엔 **RSS만** 읽는다. RSS는 유튜브 공식 경로라 데이터센터에서도 안정적.

---

## 3. 핵심 코드 뼈대

### 3-1. 채널 목록 (channel_id 하드코딩)
> 배포 전에 딱 한 번, 기존 `find_channel_id()`를 로컬에서 돌려 UC... 값을 받아 여기에 옮겨 적는다.

```python
# (주제, 이름, channel_id) — channel_id는 안 바뀌므로 상수로 박아둔다
CHANNELS = [
    ("포챔스", "모노",   "UCfKTcDDUzjMpPmV4KuOhkFg"),
    ("포챔스", "즈랑", "UCsBRzl28bxwukBr8bXYXbYA"),
    ("포챔스", "눈파티", "UCd6CX2LiQE2dEAPXwk2N0jg"),
    ("체스", "체스인사이드", "UCnUPEKHg9B8Ut75rsgqXWYw"),
    ("체스", "체스프릭", "UCO5rDIUWfCX7gsCzURXMUCg"),
    ("문명6", "문명한입", "UCc_tGAM6z-s-GCc6A6irdeg"),
    ("문명6", "전구냥", "UC3IJEZgLfSVgLdEXe8XbYag"),
    ("프로그래밍", "코드깎는노인", "UCRpOIr-NJpK9S483ge20Pgw"),
    ("프로그래밍", "코딩애플", "UCSLrpBAzr-ROVGHQ5EmxnUg")
]
```

### 3-2. RSS → 영상 목록 (수집의 심장)

```python
import urllib.request, xml.etree.ElementTree as ET

NS = {"a": "http://www.w3.org/2005/Atom"}

def latest_videos(channel_id, limit=5):
    url = f"https://www.youtube.com/feeds/videos.xml?channel_id={channel_id}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    xml = urllib.request.urlopen(req, timeout=20).read()

    root = ET.fromstring(xml)
    videos = []
    for entry in root.findall("a:entry", NS)[:limit]:
        title = entry.find("a:title", NS).text
        link  = entry.find("a:link", NS).attrib["href"]
        published = entry.find("a:published", NS).text[:10]  # YYYY-MM-DD
        videos.append((title, link, published))
    return videos
```

### 3-3. HTML 생성 (클릭 가능한 링크가 여기서 생김)

```python
def build_html(sections):
    # sections = [(주제, 이름, [(title, link, date), ...]), ...]
    rows = []
    for topic, name, videos in sections:
        rows.append(f"<h2>[{topic}] {name}</h2>")
        for title, link, date in videos:
            rows.append(
                f'<p><a href="{link}" target="_blank" rel="noopener">{title}</a>'
                f' <small>{date}</small></p>'
            )

    body = "\n".join(rows)
    return f"""<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>최신 영상 모음</title>
</head>
<body>
  <h1>최신 영상 모음</h1>
  {body}
</body>
</html>"""
```

### 3-4. 메인 (수집 → 파일 저장)

```python
if __name__ == "__main__":
    sections = []
    for topic, name, cid in CHANNELS:
        try:
            videos = latest_videos(cid, limit=3)
        except Exception as e:
            videos = [(f"(수집 실패: {e})", "#", "")]  # 한 채널 실패해도 계속
        sections.append((topic, name, videos))

    html = build_html(sections)
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(html)          # ← 이 파일을 GitHub Pages가 공개함
    print("index.html 생성 완료")
```

### 3-5. GitHub Actions 워크플로 (`.github/workflows/collect.yml`)

```yaml
name: collect-and-publish

on:
  schedule:
    - cron: "0 */3 * * *"   # 3시간마다 (UTC 기준)
  workflow_dispatch:         # 웹에서 "지금 실행" 버튼용

permissions:
  contents: write            # 결과를 저장소에 커밋할 권한

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4          # 내 코드 내려받기

      - uses: actions/setup-python@v5      # python 설치
        with:
          python-version: "3.12"

      - run: python collect.py             # ← 핵심: 실행 → index.html 생성

      - name: publish to gh-pages          # 결과 배포
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .                   # index.html 이 있는 위치
```

### 흐름 ↔ 코드 대응
| 데이터 흐름 단계 | 담당 코드 |
|---|---|
| ① cron 트리거 | `on: schedule: cron` |
| ② Actions 실행 | `checkout` + `setup-python` |
| ③ 수집 | `run: python collect.py` 안의 `latest_videos()` |
| ④ index.html 생성 | `build_html()` |
| ⑤ Pages 공개 | `actions-gh-pages` 스텝 |
| ⑥ 폰 열람 | 완성된 `index.html` |

---

## 4. 집에서 할 일 (체크리스트)

- [ ] 로컬에서 `find_channel_id()`로 9개 채널의 `channel_id(UC...)` 전부 뽑기
- [ ] `collect.py`를 위 뼈대대로 리팩터링 (핸들 긁기 제거 → channel_id 상수 + RSS만)
- [ ] `build_html()` 추가, `index.html` 로컬 생성 확인 (폰 대신 브라우저로 먼저 열어보기)
- [ ] (선택) HTML에 간단한 CSS 입혀 모바일에서 보기 좋게
- [ ] GitHub 저장소 생성 (public) 후 코드 push
- [ ] `.github/workflows/collect.yml` 추가
- [ ] 저장소 Settings → Pages 에서 `gh-pages` 브랜치로 게시 활성화 (최초 1회)
- [ ] Actions 탭에서 "Run workflow"로 수동 1회 실행 → 배포 URL 확인
- [ ] 폰에서 `https://아이디.github.io/저장소/` 열어 즐겨찾기 추가

---

## 5. 나중에 개선 아이디어 (선택)
- 일시적 네트워크/수집 실패 시 자동 재시도(몇 초 뒤 retry)
- 채널별 썸네일 표시
- 새 영상만 강조 / 마지막 갱신 시각 표기
- cron 주기 조정 (더 자주 or 하루 몇 번)
