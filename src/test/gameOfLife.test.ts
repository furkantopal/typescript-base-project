import { GameOfLife } from '../main/gameOfLife';

const gridValues = [
  [true, false, false, false, true],
  [false, true, true, true, false],
  [true, false, true, false, false],
  [true, true, true, true, false],
  [true, true, false, false, false],
];

describe('Game of Life', () => {
  const gameOfLife: GameOfLife = new GameOfLife(gridValues);
  gameOfLife.nextGen();
  it('should a live cell die if it has fewer than two live neighbours - under-population', () => {
    expect(gameOfLife.getGridSituation()[0][0]).toBeFalsy();
    expect(gameOfLife.getGridSituation()[0][4]).toBeFalsy();
    expect(gameOfLife.getGridSituation()[3][3]).toBeFalsy();
    expect(gameOfLife.getGridSituation()[4][0]).toBeFalsy();
    expect(gameOfLife.getGridSituation()[4][1]).toBeFalsy();
  });

  it('should a live cell continue to live if it has two or three live neighbours - continue to live', () => {
    expect(gameOfLife.getGridSituation()[1][2]).toBeTruthy();
    expect(gameOfLife.getGridSituation()[1][3]).toBeTruthy();
    expect(gameOfLife.getGridSituation()[3][2]).toBeTruthy();
  });

  it('should a live cell die if it has more than three live neighbours - overcrowding', () => {
    expect(gameOfLife.getGridSituation()[1][1]).toBeFalsy();
    expect(gameOfLife.getGridSituation()[2][2]).toBeFalsy();
    expect(gameOfLife.getGridSituation()[3][0]).toBeFalsy();
    expect(gameOfLife.getGridSituation()[3][1]).toBeFalsy();
  });
  it('should a dead cell with exactly 3 live neighbours becomes a live cell - reproduction', () => {
    expect(gameOfLife.getGridSituation()[0][2]).toBeTruthy();
  });
});
