import assert from 'node:assert/strict';

/**
 * 두 사상이 "같다"를 우리는 **판정할 수 없다.**
 *
 * 범주의 법칙(`h ∘ (g ∘ f) = (h ∘ g) ∘ f`)에 있는 `=` 는 함수의 외연적 동등성
 * (extensional equality) — "모든 입력에서 같은 결과" — 인데, 이건 일반적으로 결정 불가능이다.
 * `f === g` 로 비교하면 참조 동등성이라 항상 실패한다.
 *
 * 그래서 여기서 하는 건 **증명이 아니라 반증 시도**다. 표본 입력에서 어긋나면 잡히고,
 * 안 어긋나면 "적어도 여기선 맞다"까지만 말한다. 이 한계를 알고 쓰는 게 중요하다.
 * (진짜 증명은 종이에서 하거나, 타입 수준으로 강제하거나, 정리 증명기가 필요하다.)
 */
export function agreeOn<A, B>(
  samples: readonly A[],
  left: (a: A) => B,
  right: (a: A) => B,
  what: string,
): void {
  for (const a of samples) {
    assert.deepStrictEqual(
      left(a),
      right(a),
      `${what} — 입력 ${JSON.stringify(a)} 에서 어긋남`,
    );
  }
}
