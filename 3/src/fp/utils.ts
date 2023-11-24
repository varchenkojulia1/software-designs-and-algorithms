import {Maybe, none, some} from './maybe';
import {InitialClient} from "../mocks";
import {Point} from "../types";

export const constant = <A>(a: A) => () => a;

/**
 * Performs left-to-right function composition
 */
export function flow<A, B, C>(fa: (a: A) => B, fb: (b: B) => C): (a: A) => C;
export function flow<A, B, C, D>(fa: (a: A) => B, fb: (b: B) => C, fc: (c: C) => D): (a: A) => D;
export function flow<A, B, C, D>(...fns: Array<(...args: Array<any>) => any>);
export function flow(...fns: Array<(...args: Array<any>) => any>) {
  return (a: any) => fns.reduce(
    (acc, fn) => fn(acc),
    a,
  );
}

/**
 * Pipes the value into the pipeline of functions
 * Handy for automatic data typing
 */
export function pipe<A, B>(a: A, fb: (a: A) => B): B;
export function pipe<A, B>(a: A, ...fns: Array<(...args: Array<any>) => any>): B
export function pipe(a: any, ...fns: Array<(...args: Array<any>) => any>) {
  if (fns.length === 0) {
    return a;
  }
  let newValue: any = fns[0](a);

  for (let i: number = 1; i < fns.length; i++) {
    newValue = fns[i](newValue)
  }
  return newValue;
}

export type Predicate<A> = (a: A) => boolean
/**
 * High-order function for pattern matching
 * Each parameter is a tuple [predicate, fn]
 * Returns a function, by passing some value to which, this value would be passed to predicates left-to-right
 * and if the predicate returns "true" - the value would be passed to the "fn"
 *
 * See examples in the tests
 */
export const matcher = <A, R>(...predicates: Array<[Predicate<A>, (a: A) => R]>) => (a) => {
  const i = predicates.findIndex(([predicate]) => predicate(a));
  return i > -1 ? predicates[i][1](a) : undefined;
};

/**
 * Returns the property of the object
 * If there is no such property, return none
 *
 * @example
 * const getAge = prop('age')
 * expect(getAge({ age: 10 })).toStrictEqual(some(10))
 */
export const prop = <V extends Record<string, unknown>, K extends keyof V>(key: K) => (obj: V): Maybe<V[K]> => key in obj || obj[key] ?  some(obj[key]) : none;

export const getDemands = prop<InitialClient, keyof InitialClient>('demands');

export function getDistance(a: Point, b: Point): number {
    const dist1 = Math.abs(a.x - b.x);
    const dist2 = Math.abs(a.y - b.y);

    return +Math.sqrt(dist1 * dist1 + dist2 * dist2).toFixed(3);
}
