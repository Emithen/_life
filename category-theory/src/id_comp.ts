// identity
const identity = <T>(x: T): T => x;

// compose
const compose = <A, B, C>(g: (b: B) => C, f: (a: A) => B) => (x: A): C => g(f(x));





// Test

const add3 = (n: number) => n + 3;

const f_id = compose(add3, identity<number>);
console.log('f(id(10)) === f(10)? ', f_id(10) === add3(10));

const id_f = compose(identity<number>, add3);
console.log('id(f(10)) === f(10)? ', id_f(10) === add3(10));