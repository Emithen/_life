# category-theory — 개요 (지도)

> 기준: _life `9c24ac6` · 2026-08-07 · 시작 2026-08-07

## 한 줄

`youtube-feed`(만드는 트랙)·`claude-code-mastery`(도구 트랙)와 병행하는 **개념 트랙**.
범주론을 **프로그래머 각도로** 요네다 보조정리까지 완주하는 것이 목표.

**원칙 하나**: 법칙을 눈으로 믿지 않는다. **TypeScript로 실행해서 확인한다.**

## 왜 시작했나

`youtube-feed`를 만들며 "이 변환들을 어떻게 안 깨지게 이어붙이지"가 반복해서 나왔고,
그걸 매번 감으로 풀었다. 감으로 풀던 것에 **정확한 이름이 있다**는 걸 알게 돼서 시작했다.
성장 속도를 스스로 가속하려면 감을 언어로 바꿔야 한다는 판단.

## 관통 개념 — "범주론은 합성(composition)의 학문이다"

범주는 딱 셋을 요구한다 — 대상(점), 사상(화살표), 합성(∘).
그리고 두 법칙만 지키면 된다:

| 법칙 | 식 |
|---|---|
| 결합법칙 | `h ∘ (g ∘ f) = (h ∘ g) ∘ f` |
| 항등법칙 | `id ∘ f = f = f ∘ id` |

앞으로 배울 전부(함자·자연변환·수반·모나드)는 **"무엇을 합성 가능하게 만드는가"**의
서로 다른 답이다. 예: `A → Maybe<B>` 와 `B → Maybe<C>` 는 그냥은 안 붙는다 →
붙이려고 만든 게 모나드다.

## 확정된 방침 (그리고 그 이유)

| 결정 | 이유 |
|---|---|
| 주교재 = Milewski 『Category Theory for Programmers』 | 증명보다 "이게 코드에서 뭐였나"가 먼저여야 안 튕겨나감 |
| 실습 언어 = TypeScript | 이미 쓰는 언어. 새 언어(Haskell) 배우면 트랙이 둘이 됨 |
| **빌드 단계 없음** | Node가 `.ts`를 타입 스트리핑으로 직접 실행. `tsc`는 검사만(`--noEmit`) |
| **`fp-ts` 안 씀** | Functor·Monad를 직접 만들어보는 게 학습 목표. 남의 구현을 import하면 배울 게 사라짐. 7단계 이후 "남들은 이렇게 했다"로만 참고 |

## 폴더 구성

| 경로 | 내용 |
|---|---|
| [category-theory/ROADMAP.md](../../../category-theory/ROADMAP.md) | **진짜 지도.** 0~15단계 + 진도 체크박스 + 학습 로그 |
| `category-theory/notes/` | 개념 1개 = 파일 1개. 고정 틀 있음 |
| `category-theory/src/` | 실습 코드. 단계당 한 파일 + `lib/laws.ts` |
| `category-theory/src/lib/laws.ts` | 법칙 확인 헬퍼 (`agreeOn`) |

## 노트 한 장의 고정 틀

`concepts.md`가 검증한 형식을 그대로 가져왔다 — **정의는 검색하면 나오지만
내가 왜 헷갈렸는지는 안 나온다**는 원칙.

```
**한 줄** / **왜 이 이름인가** / **TS에서는** / **⚠️ 헷갈렸던 것** / **더 볼 키워드**
```

> `⚠️ 헷갈렸던 것`이 비어 있으면 그 개념은 **아직 안 배운 것**으로 친다.

## 다른 문서와의 경계

| 어디에 | 무엇을 |
|---|---|
| [concepts.md](../../../concepts.md) | 작업하다 **우연히** 만난 개념. 반 쪽 |
| `category-theory/notes/` | **의도적으로** 공부하는 범주론 개념 |
| 여기(`docs/core/`) | 트랙 자체의 지도 — `/core`가 읽는 캐시 |

## 지금 어디까지

- ✅ **0단계** 관통 개념·자가 점검 — [notes/00-why.md](../../../category-theory/notes/00-why.md)
- 🔄 **1단계** Category — [notes/01-category.md](../../../category-theory/notes/01-category.md),
  [src/01-category.ts](../../../category-theory/src/01-category.ts)
  (결합·항등 법칙 확인 완료, 모노이드 예시 완료 / 포셋 범주 남음)
- ⬜ 2~15단계 — 노트·코드는 **그 단계에 도달할 때 만든다**. 빈 파일을 미리 두지 않는다.

## 검증

```bash
cd /Users/soggyfries/Desktop/_life/category-theory && npm run check
```

`typecheck`(타입 수준 주장) + `test`(표본 입력에서의 법칙) 둘 다 돈다.

> ⚠️ `agreeOn`은 **증명이 아니라 반증 시도**다. 함수의 외연적 동등성은 판정 불가능이라
> 표본 입력에서만 확인한다. 이 한계를 알고 쓰는 게 중요하다.

## 최대 난관 (미리 알아둘 것)

**7단계 Functor**. TypeScript엔 higher-kinded type이 없어서 `Functor<F>`를 직접 못 쓴다.
URI 문자열 + 인터페이스 병합으로 우회하는데(defunctionalization),
**이 지저분함은 범주론이 아니라 TS의 한계**다. 노트에 분리해서 적기로 했다 —
안 그러면 "함자는 원래 이렇게 지저분한 것"이라고 잘못 배운다.
