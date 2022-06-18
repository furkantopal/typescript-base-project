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
    expect(gameOfLife.getGridSituation()[0][4]).toBeFalsy();
    expect(gameOfLife.getGridSituation()[1][1]).toBeFalsy();
    expect(gameOfLife.getGridSituation()[1][3]).toBeFalsy();
    expect(gameOfLife.getGridSituation()[3][3]).toBeFalsy();
    expect(gameOfLife.getGridSituation()[4][1]).toBeFalsy();
  });
});
