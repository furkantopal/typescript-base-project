import { Rover } from '../main/rover';

describe('Acceptance test', () => {
  it('should be ', () => {
    const rover = new Rover(['X1', 'Y2', 'DN']);
    rover.execute(['M9', '1L', '2F', '3L', '4F', '5L', '6F', '7L', '8F', '9F']);
    const roverLocation = rover.getLocation();

    expect(roverLocation).toEqual(['X93', 'Y23', 'DN']);
  });
});
