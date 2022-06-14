import { calc } from '../main/example';

describe('example test', () => {
  it('sum should be 34', () => {
    expect(calc([1, 2, 3, 4, 5, 6, 7])).toBe(34);
  });
});
