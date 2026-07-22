# collect.py — Day 3: 채널 하나에서 최신 영상 가져오기
# 실행: 터미널에서  python collect.py
#
# 하는 일:
#  1) @핸들 페이지를 열어서 channel_id(UC...)를 찾는다
#  2) 그 channel_id로 RSS를 열어서 최신 영상 제목 + 링크를 뽑는다

import urllib.request
import urllib.parse
import re
import xml.etree.ElementTree as ET

# 수집할 채널 목록 (주제, 이름, @핸들 주소)
# 채널을 더 넣고 싶으면 이 리스트에 한 줄만 추가하면 됨.
CHANNELS = [
    ("포챔스",     "모노",          "https://www.youtube.com/@moonoo22"),
    ("포챔스",     "즈랑",          "https://www.youtube.com/@즈랑"),
    ("포챔스",     "눈파티",        "https://www.youtube.com/@눈파티"),
    ("체스",       "체스인사이드",  "https://www.youtube.com/@chessinside"),
    ("체스",       "체스프릭",      "https://www.youtube.com/@chessfreak"),
    ("문명6",      "문명한입",      "https://www.youtube.com/@Civ6OneBite"),
    ("문명6",      "전구냥",        "https://www.youtube.com/@전구냥"),
    ("프로그래밍", "코드깎는노인",  "https://www.youtube.com/@코드깎는노인"),
    ("프로그래밍", "코딩애플",      "https://www.youtube.com/@codingapple"),
]

# 유튜브가 브라우저인 척 해야 잘 열림
HEADERS = {"User-Agent": "Mozilla/5.0"}


def get_html(url):
    # 한글 등 ASCII가 아닌 글자를 URL용으로 안전하게 변환 (예: 한글 @핸들)
    url = urllib.parse.quote(url, safe=":/?=&@")
    req = urllib.request.Request(url, headers=HEADERS)
    return urllib.request.urlopen(req, timeout=20).read().decode("utf-8", "ignore")


def find_channel_id(handle_url):
    html = get_html(handle_url)
    # 유튜브 페이지 형식이 여러 가지라, 아이디가 들어있을 만한 패턴을 모두 시도
    # 주의: "이 페이지의 주인 채널"만 가리키는 externalId / canonical을 먼저 시도한다.
    #  "channelId"는 추천·관련 채널에도 붙어 나와서 엉뚱한 채널이 먼저 잡힐 수 있음
    #  (예: 모노 페이지에서 서브 채널이 잡히던 문제).
    patterns = [
        r'"externalId":"(UC[0-9A-Za-z_-]{22})"',            # 이 채널의 진짜 id
        r'youtube\.com/channel/(UC[0-9A-Za-z_-]{22})',      # canonical 링크 등
        r'"channelId":"(UC[0-9A-Za-z_-]{22})"',             # 위 둘 실패 시 차선
        r'(UC[0-9A-Za-z_-]{22})',  # 최후의 수단: 아무데서나 UC로 시작하는 아이디
    ]
    for pat in patterns:
        m = re.search(pat, html)
        if m:
            return m.group(1)
    # 다 실패하면 받은 HTML을 파일로 저장 → 같이 열어보기
    with open("debug_page.html", "w", encoding="utf-8") as f:
        f.write(html)
    raise RuntimeError(
        f"channel_id를 못 찾았어요. 받은 HTML 길이={len(html)}. "
        "debug_page.html 로 저장했으니 그 파일을 확인해봐요."
    )


def latest_videos(channel_id, limit=5):
    rss_url = f"https://www.youtube.com/feeds/videos.xml?channel_id={channel_id}"
    xml = get_html(rss_url)
    root = ET.fromstring(xml)
    ns = {"a": "http://www.w3.org/2005/Atom"}
    videos = []
    for entry in root.findall("a:entry", ns)[:limit]:
        title = entry.find("a:title", ns).text
        link = entry.find("a:link", ns).attrib["href"]
        videos.append((title, link))
    return videos


if __name__ == "__main__":
    # 채널을 하나씩 돌면서 최신 영상을 가져온다.
    for topic, name, handle_url in CHANNELS:
        print("=" * 50)
        print(f"[{topic}] {name}")
        print("=" * 50)
        try:
            cid = find_channel_id(handle_url)
            print(name, cid)
            for title, link in latest_videos(cid, limit=3):
                print(f"  - {title}")
                print(f"    {link}")
        except Exception as e:
            # 한 채널이 실패해도 멈추지 않고 다음 채널로 넘어감
            print(f"  (실패: {e})")
        print()
