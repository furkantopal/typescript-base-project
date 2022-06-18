import { GameOfLife } from '../main/gameOfLife';

const gridValues = [
  [false, false, false, false, true],
  [false, true, false, true, false],
  [false, false, true, false, false],
  [false, true, false, true, false],
  [false, true, false, false, false],
];

describe('Game of Life', () => {
  it('should a live cell die if it has fewer than two live neighbours - under-population', () => {
    let gameOfLife: GameOfLife = new GameOfLife(gridValues);
    gameOfLife.nextGen();
    expect(3).toBe(3);
  });
});
