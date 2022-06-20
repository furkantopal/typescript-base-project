export class Offset {
  projects: Project[] = [];

  async add(project: Project): Promise<void> {
    if (this.projects.indexOf(project) === -1) {
      this.projects.push(project);
    }
  }

  async remove(project: Project): Promise<void> {
    if (this.projects.indexOf(project) === -1) {
      throw new Error('This project is not saved before');
    }

    this.projects = this.projects.filter((pj) => pj !== project);
  }

  async get(filter: Partial<Project>): Promise<Project[] | undefined> {
    if (Object.keys(filter).length == 0) {
      throw new Error('Filter should at least one field. (technology, country, offsetAmount)');
    }

    return this.projects.filter(
      (pj) =>
        pj.technology === (filter.technology ?? pj.technology) &&
        pj.country === (filter.country ?? pj.country) &&
        pj.offsetAmount === (filter.offsetAmount ?? pj.offsetAmount)
    );
  }
}

type Project = {
  technology: string;
  country: string;
  offsetAmount: number;
};
