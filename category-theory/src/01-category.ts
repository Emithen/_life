/**
 * 1단계 — Category
 *
 * 노트: ../notes/01-category.md
 *
 * 여기서 하는 일: "타입과 함수가 범주를 이룬다"는 주장을 실제로 실행해서 확인한다.
 * 그리고 "사상은 함수가 아닐 수도 있다"를 대상 하나짜리 범주(모노이드)로 확인한다.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { agreeOn } from './lib/laws.ts';

// ─────────────────────────────────────────────────────────────
// 범주 **TS**: 대상 = 타입, 사상 = 함수
// ─────────────────────────────────────────────────────────────

/** `A → B` 인 화살표 하나. 범주론의 사상(morphism)에 대응. */
export type Morphism<A, B> = (a: A) => B;

/** 각 대상마다 하나씩 있는 항등 사상 `id_A : A → A`. */
export const id = <A>(a: A): A => a;

/**
 * 합성 `g ∘ f`. **오른쪽 것을 먼저 적용한다** — 수학 표기 순서를 그대로 지켰다.
 * `compose(g, f)(x)` 는 `g(f(x))`.
 */
export const compose =
  <A, B, C>(g: Morphism<B, C>, f: Morphism<A, B>): Morphism<A, C> =>
  (a: A): C =>
    g(f(a));

// 확인에 쓸 표본 사상들
const double: Morphism<number, number> = (n) => n * 2;
const show: Morphism<number, string> = (n) => `#${n}`;
const shout: Morphism<string, string> = (s) => s.toUpperCase() + '!';

const NUMBERS = [0, 1, -3, 42, 7] as const;

test('결합법칙 — h ∘ (g ∘ f) = (h ∘ g) ∘ f', () => {
  agreeOn(
    NUMBERS,
    compose(shout, compose(show, double)),
    compose(compose(shout, show), double),
    '결합법칙',
  );
});

test('항등법칙 — id ∘ f = f = f ∘ id', () => {
  agreeOn(NUMBERS, compose(id<string>, show), show, '왼쪽 항등');
  agreeOn(NUMBERS, compose(show, id<number>), show, '오른쪽 항등');
});

test('합성은 항상 존재한다 — 이게 그래프와의 차이', () => {
  // A → B 와 B → C 가 있으면 A → C 가 **반드시** 나온다.
  // 그래프에는 이런 의무가 없다. 범주는 데이터가 아니라 데이터 + 법칙이다.
  const numberToShout: Morphism<number, string> = compose(shout, show);
  assert.equal(numberToShout(3), '#3!');
});

// ─────────────────────────────────────────────────────────────
// 대상이 **하나뿐인** 범주 = 모노이드
//
// 여기서 사상은 함수가 아니라 그냥 문자열이다.
// "사상 = 함수"라는 인상을 깨는 게 이 예시의 목적.
// ─────────────────────────────────────────────────────────────

/** 대상 `*` 하나뿐이므로 모든 사상은 `* → *`. 그래서 항상 합성 가능하다. */
export const StrCat = {
  /** 항등 사상 = 빈 문자열 */
  id: '',
  /**
   * 사상 `s` 를 "뒤에 s를 붙이는 화살표"로 읽으면,
   * `compose(g, f)` 는 f를 먼저 적용하고 g를 적용하는 것 → `f + g`.
   *
   * ⚠️ 인자 순서와 결과 순서가 뒤집혀 보이는 게 처음에 제일 헷갈린다.
   *    화살표 순서(오른쪽 먼저)를 지키면 이게 맞다.
   */
  compose: (g: string, f: string): string => f + g,
} as const;

test('모노이드도 범주다 — 대상 1개, 사상은 문자열', () => {
  const { id: e, compose: dot } = StrCat;

  // 결합법칙
  assert.equal(dot(dot('c', 'b'), 'a'), dot('c', dot('b', 'a')));
  assert.equal(dot(dot('c', 'b'), 'a'), 'abc');

  // 항등법칙
  assert.equal(dot(e, 'a'), 'a');
  assert.equal(dot('a', e), 'a');
});

// ─────────────────────────────────────────────────────────────
// 연습 (아직 안 함 — 로드맵 1단계에 남아 있음)
//
// 포셋(순서집합)을 범주로 만들어 보기.
//   대상 = 원소, 사상 `a → b` = "a ≤ b 라는 사실" (함수가 아니다!)
//   합성 = 추이성, 항등 = 반사성
//   Hom(a, b) 의 원소 개수는 0 아니면 1.
// ─────────────────────────────────────────────────────────────
