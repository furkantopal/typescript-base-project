import { Offset } from '../main/offset';

const germanyProject = {
  technology: 'Wind',
  country: 'Germany',
  offsetAmount: 1000,
};

const franceProject = {
  technology: 'Wind',
  country: 'France',
  offsetAmount: 1000,
};

describe('Offset', () => {
  const offset: Offset = new Offset();
  it('should add a new project', async () => {
    const offset: Offset = new Offset();
    await offset.add(germanyProject);
    expect(await offset.get(germanyProject)).toEqual([germanyProject]);
  });

  it('should remove an existing project', async () => {
    const offset: Offset = new Offset();
    await offset.add(germanyProject);
    await offset.remove(germanyProject);
    expect(await offset.get(germanyProject)).toEqual([]);
  });

  it('should get existing projects by filter', async () => {
    const offset: Offset = new Offset();
    await offset.add(germanyProject);
    await offset.add(franceProject);
    expect(
      await offset.get({
        technology: 'Wind',
      })
    ).toEqual([germanyProject, franceProject]);
  });

  it('should throw error when the filter is empty', async () => {
    const offset: Offset = new Offset();
    await offset.add(germanyProject);
    await offset.add(franceProject);
    await expect(() => offset.get({})).rejects.toThrowError('Filter should at least one field. (technology, country, offsetAmount)');
  });

  it('should not add same project twice', async () => {
    const offset: Offset = new Offset();
    await offset.add(germanyProject);
    await offset.add(germanyProject);
    expect(await offset.get(germanyProject)).toEqual([germanyProject]);
  });

  it('should throw error when remove called with false data', async () => {
    const offset: Offset = new Offset();
    await expect(() => offset.remove(germanyProject)).rejects.toThrowError('This project is not saved before');
  });
});
