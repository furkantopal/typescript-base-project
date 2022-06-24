import { Application, Config } from '../main/config';

describe('Config test', () => {
  it('should output one server for one application', () => {
    let config: Config = new Config();
    expect(
      config.execute([
        {
          CPU: 1,
          RAM: 2,
          disk: 3,
        },
      ])
    ).toHaveLength(1);
  });

  it('should output one server for two small applications', () => {
    let config: Config = new Config();
    expect(
      config.execute([
        {
          CPU: 1,
          RAM: 2,
          disk: 3,
        },
        {
          CPU: 1,
          RAM: 1,
          disk: 1,
        },
      ])
    ).toHaveLength(1);
  });

  it('should output two server for two big applications', () => {
    let config: Config = new Config();
    expect(
      config.execute([
        {
          CPU: 5,
          RAM: 5,
          disk: 5,
        },
        {
          CPU: 5,
          RAM: 5,
          disk: 5,
        },
      ])
    ).toHaveLength(2);
  });

  it('should output two server for two small one big applications', () => {
    let config: Config = new Config();
    expect(
      config.execute([
        {
          CPU: 1,
          RAM: 1,
          disk: 1,
        },
        {
          CPU: 5,
          RAM: 5,
          disk: 5,
        },
        {
          CPU: 1,
          RAM: 1,
          disk: 1,
        },
      ])
    ).toHaveLength(2);
  });

  it('should output no server for no application', () => {
    let config: Config = new Config();
    expect(config.execute([])).toHaveLength(0);
  });
});
