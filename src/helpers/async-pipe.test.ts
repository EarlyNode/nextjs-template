import { describe, expect, it } from 'vitest';

import { asyncPipe } from './async-pipe';

const asyncDouble = (n: number) => Promise.resolve(n * 2);
const asyncInc = (n: number) => Promise.resolve(n + 1);

describe('asyncPipe()', async () => {
  it('Given two promise, should compose them in reverse mathematical order', async () => {
    const asyncIncDouble = asyncPipe(asyncInc, asyncDouble);

    const actual = await asyncIncDouble(20);
    const expected = 42;

    expect(actual).toBe(expected);
  });
});
