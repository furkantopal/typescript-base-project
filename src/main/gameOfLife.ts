export class GameOfLife {
  private grid: boolean[][];

  constructor(grid: boolean[][]) {
    this.grid = grid;
  }

  public nextGen(): void {
    this.checkTheGrid();
  }

  public getGridSituation(): boolean[][] {
    return this.grid;
  }

  private checkPopulation(cell: [number, number]) {
    const neighboursLivePopulationCount = this.getNeighboursDeadOrAliveInformation(cell).filter(Boolean).length;

    if (this.isCellAlive(cell)) {
      if (neighboursLivePopulationCount < 2) {
        this.grid[cell[0]][cell[1]] = false;
        console.log(`Now [${cell[0]}, ${cell[1]}] is dead due to under-population`);
      }
      if (neighboursLivePopulationCount === 2 || neighboursLivePopulationCount === 3) {
        this.grid[cell[0]][cell[1]] = true;
        console.log(`[${cell[0]}, ${cell[1]}] will continue to live`);
      }
      if (neighboursLivePopulationCount > 3) {
        console.log(`Now [${cell[0]}, ${cell[1]}] is dead due to overcrowding`);
        this.grid[cell[0]][cell[1]] = false;
      }
    } else {
      if (neighboursLivePopulationCount === 3) {
        console.log(`Now [${cell[0]}, ${cell[1]}] is alive due to reproduction`);
        this.grid[cell[0]][cell[1]] = true;
      }
    }
  }

  private getNeighboursDeadOrAliveInformation(cell: [number, number]) {
    let neighboursPopulation: boolean[] = [];

    for (let x = cell[0] - 1; x <= cell[0] + 1; x++) {
      for (let y = cell[1] - 1; y <= cell[1] + 1; y++) {
        if (this.isNotTheCellItself(x, y, cell)) {
          if (this.isNeighbourInTheGridBoundaries(x, y)) {
            neighboursPopulation.push(this.grid[x][y]);
          } else {
            neighboursPopulation.push(false);
          }
        }
      }
    }
    return neighboursPopulation;
  }

  private isNeighbourInTheGridBoundaries(x: number, y: number) {
    return x < this.grid[0].length && y < this.grid.length && x >= 0 && y >= 0;
  }
  private isNotTheCellItself(x: number, y: number, cell: [number, number]) {
    return x !== cell[0] || y !== cell[1];
  }

  private isCellAlive(cell: [number, number]) {
    return this.grid[cell[0]][cell[1]];
  }

  private checkTheGrid() {
    for (let x = 0; x < this.grid[0].length; x++) {
      for (let y = 0; y < this.grid.length; y++) {
        this.checkPopulation([x, y]);
      }
    }
  }
}
