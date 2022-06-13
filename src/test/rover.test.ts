import { Rover } from '../main/rover';

const grid = {
  X: 100,
  Y: 100,
};

describe('Rover', () => {
  it.each([[['X1', 'Y2', 'DN']], [['X2', 'Y3', 'DN']]])('should return initial location %s', (initialLocation) => {
    const rover = new Rover(grid, initialLocation);
    expect(rover.getLocation()).toEqual(initialLocation);
  });

  it.each([
    {
      initialLocation: ['X1', 'Y2', 'DN'],
      command: ['M1', '1L'],
      finalLocation: ['X1', 'Y2', 'DW'],
    },
    {
      initialLocation: ['X1', 'Y2', 'DN'],
      command: ['M1', '2L'],
      finalLocation: ['X1', 'Y2', 'DS'],
    },
    {
      initialLocation: ['X1', 'Y2', 'DN'],
      command: ['M1', '3L'],
      finalLocation: ['X1', 'Y2', 'DE'],
    },
    {
      initialLocation: ['X1', 'Y2', 'DN'],
      command: ['M1', '4L'],
      finalLocation: ['X1', 'Y2', 'DN'],
    },
  ])('should turn left', ({ initialLocation, command, finalLocation }) => {
    const rover = new Rover(grid, initialLocation);
    rover.execute(command);
    const roverLocation = rover.getLocation();

    expect(roverLocation).toEqual(finalLocation);
  });

  it.each([
    {
      initialLocation: ['X1', 'Y2', 'DN'],
      command: ['M1', '1R'],
      finalLocation: ['X1', 'Y2', 'DE'],
    },
    {
      initialLocation: ['X1', 'Y2', 'DN'],
      command: ['M1', '2R'],
      finalLocation: ['X1', 'Y2', 'DS'],
    },
    {
      initialLocation: ['X1', 'Y2', 'DN'],
      command: ['M1', '3R'],
      finalLocation: ['X1', 'Y2', 'DW'],
    },
    {
      initialLocation: ['X1', 'Y2', 'DN'],
      command: ['M1', '4R'],
      finalLocation: ['X1', 'Y2', 'DN'],
    },
  ])('should turn right', ({ initialLocation, command, finalLocation }) => {
    const rover = new Rover(grid, initialLocation);
    rover.execute(command);
    const roverLocation = rover.getLocation();

    expect(roverLocation).toEqual(finalLocation);
  });

  it.each([
    {
      initialLocation: ['X1', 'Y2', 'DN'],
      command: ['M1', '1F'],
      finalLocation: ['X1', 'Y3', 'DN'],
    },
    {
      initialLocation: ['X1', 'Y2', 'DN'],
      command: ['M1', '2F'],
      finalLocation: ['X1', 'Y4', 'DN'],
    },
    {
      initialLocation: ['X1', 'Y2', 'DE'],
      command: ['M1', '1F'],
      finalLocation: ['X2', 'Y2', 'DE'],
    },
    {
      initialLocation: ['X1', 'Y2', 'DE'],
      command: ['M1', '2F'],
      finalLocation: ['X3', 'Y2', 'DE'],
    },
    {
      initialLocation: ['X1', 'Y3', 'DS'],
      command: ['M1', '1F'],
      finalLocation: ['X1', 'Y2', 'DS'],
    },
    {
      initialLocation: ['X1', 'Y3', 'DS'],
      command: ['M1', '2F'],
      finalLocation: ['X1', 'Y1', 'DS'],
    },
    {
      initialLocation: ['X3', 'Y3', 'DW'],
      command: ['M1', '1F'],
      finalLocation: ['X2', 'Y3', 'DW'],
    },
    {
      initialLocation: ['X3', 'Y3', 'DW'],
      command: ['M1', '2F'],
      finalLocation: ['X1', 'Y3', 'DW'],
    },
    {
      initialLocation: ['X1', 'Y1', 'DN'],
      command: ['M1', '99F'],
      finalLocation: ['X1', 'Y0', 'DN'],
    },
    {
      initialLocation: ['X1', 'Y1', 'DE'],
      command: ['M1', '99F'],
      finalLocation: ['X0', 'Y1', 'DE'],
    },
    {
      initialLocation: ['X1', 'Y1', 'DS'],
      command: ['M1', '2F'],
      finalLocation: ['X1', 'Y99', 'DS'],
    },
    {
      initialLocation: ['X1', 'Y1', 'DW'],
      command: ['M1', '2F'],
      finalLocation: ['X99', 'Y1', 'DW'],
    },
  ])('should move forward', ({ initialLocation, command, finalLocation }) => {
    const rover = new Rover(grid, initialLocation);
    rover.execute(command);
    const roverLocation = rover.getLocation();

    expect(roverLocation).toEqual(finalLocation);
  });

  it('should throw error when the input command is invalid', () => {
    const rover = new Rover(grid, ['X1', 'Y2', 'DN']);
    expect(() => rover.execute(['M9', '1L', '2F', '3L', '4F', '5U', '6F', '7L', '8F', '9F'])).toThrowError(`Command 5U does not supported`);
  });
});
