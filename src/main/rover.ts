export class Rover {
  location: Location = {
    X: 0,
    Y: 0,
    D: 'N',
  };

  constructor(initialLocation: string[]) {
    this.location.X = parseInt(initialLocation[0].charAt(1).concat(initialLocation[0].charAt(2) ?? ''));
    this.location.Y = parseInt(initialLocation[1].charAt(1).concat(initialLocation[1].charAt(2) ?? ''));
    this.location.D = initialLocation[2].charAt(1);
  }

  getLocation = (): string[] => {
    return [`X${String(this.location.X)}`, `Y${String(this.location.Y)}`, `D${this.location.D}`];
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
    if (this.location.D === 'N') {
      this.location.D = 'W';
      return;
    }
    if (this.location.D === 'E') {
      this.location.D = 'N';
      return;
    }
    if (this.location.D === 'S') {
      this.location.D = 'E';
      return;
    }
    if (this.location.D === 'W') {
      this.location.D = 'S';
      return;
    }
  };

  turnRight = () => {
    if (this.location.D === 'N') {
      this.location.D = 'E';
      return;
    }
    if (this.location.D === 'E') {
      this.location.D = 'S';
      return;
    }
    if (this.location.D === 'S') {
      this.location.D = 'W';
      return;
    }
    if (this.location.D === 'W') {
      this.location.D = 'N';
      return;
    }
  };

  moveForward = () => {
    if (this.location.D === 'N') {
      this.location.Y = this.location.Y + 1;

      if (this.location.Y === 100) {
        this.location.Y = 0;
      }
      return;
    }
    if (this.location.D === 'E') {
      this.location.X = this.location.X + 1;
      if (this.location.X === 100) {
        this.location.X = 0;
      }
      return;
    }
    if (this.location.D === 'S') {
      this.location.Y = this.location.Y - 1;
      if (this.location.Y === -1) {
        this.location.Y = 99;
      }
      return;
    }
    if (this.location.D === 'W') {
      this.location.X = this.location.X - 1;
      if (this.location.X === -1) {
        this.location.X = 99;
      }
      return;
    }
  };
}

type Location = {
  X: number;
  Y: number;
  D: string;
};
