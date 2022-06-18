export class GameOfLife {
  private grid: boolean[][];

  constructor(grid: boolean[][]) {
    this.grid = grid;
  }

  public nextGen(): void {
    this.checkGridUnderPopulation();
  }

  public getGridSituation(): boolean[][] {
    return this.grid;
  }

  private checkCellUnderPopulation(cell: [number, number]) {
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
    if (neighboursPopulation.filter(Boolean).length < 2) {
      this.grid[cell[0]][cell[1]] = false;
      console.log(`Now [${cell[0]}, ${cell[1]}] is dead due to under-population`);
      neighboursPopulation = [];
    }
  }

  private isNeighbourInTheGridBoundaries(x: number, y: number) {
    return x < this.grid[0].length && y < this.grid.length && x >= 0 && y >= 0;
  }
  private isNotTheCellItself(x: number, y: number, cell: [number, number]) {
    return x !== cell[0] || y !== cell[1];
  }

  private checkGridUnderPopulation() {
    for (let x = 0; x < this.grid[0].length; x++) {
      for (let y = 0; y < this.grid.length; y++) {
        if (this.grid[x][y] !== false) {
          this.checkCellUnderPopulation([x, y]);
        }
      }
    }
  }
}
