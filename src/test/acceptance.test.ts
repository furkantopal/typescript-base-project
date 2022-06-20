import { Offset } from '../main/offset';

const germanyWind = {
  technology: 'Wind',
  country: 'Germany',
  offsetAmount: 2000,
};

const congoHydropower = {
  technology: 'Hydropower',
  country: 'Congo',
  offsetAmount: 6000,
};

const austriaWind = {
  technology: 'Wind',
  country: 'Austria',
  offsetAmount: 1000,
};

const germanyForest = {
  technology: 'Forest',
  country: 'Germany',
  offsetAmount: 500,
};

describe('Acceptance test', () => {
  it('should show the added projects', async () => {
    const offset: Offset = new Offset();
    await offset.add(germanyWind);
    await offset.add(congoHydropower);
    await offset.add(austriaWind);
    await offset.add(germanyForest);

    expect(await offset.getAllProjects()).toEqual([germanyWind, congoHydropower, austriaWind, germanyForest]);
  });
});
