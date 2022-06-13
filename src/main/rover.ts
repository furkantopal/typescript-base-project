import { Compass, Direction } from './enums/enums';
import { Coordinate, Location } from './types/customTypes';

export class Rover {
  location: Location = {
    coordinate: {
      X: 0,
      Y: 0,
    },
    direction: 'N',
  };

  grid: Coordinate;

  constructor(grid: Coordinate, initialLocation: string[]) {
    this.grid = grid;
    this.location.coordinate.X = parseInt(initialLocation[0].charAt(1).concat(initialLocation[0].charAt(2) ?? ''));
    this.location.coordinate.Y = parseInt(initialLocation[1].charAt(1).concat(initialLocation[1].charAt(2) ?? ''));
    this.location.direction = initialLocation[2].charAt(1);
  }

  getLocation = (): string[] => {
    return [`X${String(this.location.coordinate.X)}`, `Y${String(this.location.coordinate.Y)}`, `D${this.location.direction}`];
  };
  execute = (inputs: string[]): void => {
    inputs.forEach((input) => {
      if (input.includes('L')) {
        this.iterateCommand(parseInt(input.charAt(0).concat(input.charAt(1) ?? '')), this.turnLeft);
      } else if (input.includes('R')) {
        this.iterateCommand(parseInt(input.charAt(0).concat(input.charAt(1) ?? '')), this.turnRight);
      } else if (input.includes('F')) {
        this.iterateCommand(parseInt(input.charAt(0).concat(input.charAt(1) ?? '')), this.moveForward);
      } else {
        if (!input.includes('M')) {
          throw new Error(`Command ${input} does not supported`);
        }
      }
    });
  };

  iterateCommand = (iterationNumber: number, commandFunction: Function): void => {
    let iteration = iterationNumber;
    while (iteration !== 0) {
      commandFunction();
      iteration--;
    }
  };

  turnLeft = (): void => {
    if (this.location.direction === Compass.NORTH) {
      this.location.direction = Direction.LEFT_FROM_NORTH;
      return;
    }
    if (this.location.direction === Compass.EAST) {
      this.location.direction = Direction.LEFT_FROM_EAST;
      return;
    }
    if (this.location.direction === Compass.SOUTH) {
      this.location.direction = Direction.LEFT_FROM_SOUTH;
      return;
    }
    if (this.location.direction === Compass.WEST) {
      this.location.direction = Direction.LEFT_FROM_WEST;
      return;
    }
  };

  turnRight = () => {
    if (this.location.direction === Compass.NORTH) {
      this.location.direction = Direction.RIGHT_FROM_NORTH;
      return;
    }
    if (this.location.direction === Compass.EAST) {
      this.location.direction = Direction.RIGHT_FROM_EAST;
      return;
    }
    if (this.location.direction === Compass.SOUTH) {
      this.location.direction = Direction.RIGHT_FROM_SOUTH;
      return;
    }
    if (this.location.direction === Compass.WEST) {
      this.location.direction = Direction.RIGHT_FROM_WEST;
      return;
    }
  };

  moveForward = () => {
    if (this.location.direction === Compass.NORTH) {
      this.location.coordinate.Y = this.location.coordinate.Y + 1;

      if (this.location.coordinate.Y === this.grid.Y) {
        this.location.coordinate.Y = 0;
      }
      return;
    }
    if (this.location.direction === Compass.EAST) {
      this.location.coordinate.X = this.location.coordinate.X + 1;
      if (this.location.coordinate.X === this.grid.X) {
        this.location.coordinate.X = 0;
      }
      return;
    }
    if (this.location.direction === Compass.SOUTH) {
      this.location.coordinate.Y = this.location.coordinate.Y - 1;
      if (this.location.coordinate.Y === -1) {
        this.location.coordinate.Y = this.grid.Y - 1;
      }
      return;
    }
    if (this.location.direction === Compass.WEST) {
      this.location.coordinate.X = this.location.coordinate.X - 1;
      if (this.location.coordinate.X === -1) {
        this.location.coordinate.X = this.grid.X - 1;
      }
      return;
    }
  };
}
