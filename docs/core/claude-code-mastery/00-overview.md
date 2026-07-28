# claude-code-mastery — 개요 (지도)

> 기준: _life `0de6e77` · 2026-07-28 · 시작 2026-07-26

## 한 줄

youtube-feed와 **병행하는 학습 트랙**. agent coding을 바닥부터 쌓아
"하네스/루프 엔지니어링" 같은 고수준 방법론까지 가는 것이 목표.

**원칙 하나**: 모든 단계를 실제 저장소(`_life`의 journal·문서, `youtube-feed`)에
**바로 써먹으며** 배운다. 연습용 예제를 따로 만들지 않는다.

## 관통 개념 — "에이전트 = 루프"

```
① 컨텍스트 창(모델이 지금 볼 수 있는 모든 것)
      ↓
② 모델이 읽고 다음 행동을 결정
      ↓
③ 도구(tool)를 호출
      ↓
④ 도구 결과가 컨텍스트에 추가됨
      ↓
   ①로 돌아가 반복
```

배우는 모든 것(skill·hook·subagent·worktree·MCP·loop)은
**이 루프의 서로 다른 부분을 조종하는 방법**일 뿐이다.

| 배울 것 | 루프에서 조종하는 부분 |
|---|---|
| CLAUDE.md · memory · skill · MCP resource | ① 뭐가 컨텍스트에 들어가나 |
| MCP · 권한(permission) | ③ 어떤 도구를 쓸 수 있나 |
| hook | 루프 주변에서 자동으로 일어나는 일 |
| subagent · worktree | 루프가 곁가지로 갈라지는 방식 |
| loop · scheduled task | 루프가 시간에 걸쳐 반복되는 방식 |

## 근거가 되는 반직관적 사실

1. **모델은 기억하지 못한다 — 매 턴 전부 다시 읽는다.**
   모델 = 상태 없는 함수(context in → 행동 out). 상태는 전부 하네스(파일·루프·memory)에 있다.
   → "컨텍스트에 없는 건 존재하지 않는다."
2. **컨텍스트 창 = 세계의 전부이자 유한한 자원.**
   꽉 차면 요약되며 정보가 손실되고, 중요한 지시가 잡음에 파묻힌다.
   → agent coding의 핵심 기술 = context engineering.
3. **도구가 유일한 손이다.** MCP = 손 붙이기, 권한 = 손 막기.

## 폴더 구성

| 경로 | 내용 |
|---|---|
| `claude-code-mastery/ROADMAP.md` | 멘탈 모델 + 8단계 학습 트랙 (상세) |
| `claude-code-mastery/CLAUDE.md` | CLAUDE.md 동작 실습용 (모든 답변을 🐢로 시작) — **나중에 지울 것** |
| `claude-code-mastery/.claude/skills/` | 말투 skill 4종: `nyang`·`sageuk`·`junggye`·`muhyeop` |

## 지금까지 한 것

- ✅ 로드맵 작성 (멘탈 모델 + 8단계)
- ✅ skill 만들기 실습 — 말투 skill 4종
- ✅ CLAUDE.md 실습 (폴더 규칙이 실제로 먹히는지)
- ✅ **이 문서 자체가 다음 실습** — `/guide`·`/core` skill로 컨텍스트 관리(토큰 절약) 적용

## 더 깊이 보려면

`claude-code-mastery/ROADMAP.md`에 8단계 트랙과 각 단계의 배울 것이 정리돼 있다.
