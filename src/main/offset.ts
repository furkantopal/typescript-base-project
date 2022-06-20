export class Offset {
  private projects: Project[] = [];

  async add(project: Project): Promise<void> {
    const projectInfo = this.projects.find((pj) => pj.country === project.country && pj.technology === pj.technology);

    if (projectInfo) {
      const projectIndex = this.projects.indexOf(projectInfo);
      this.projects[projectIndex] = {
        ...this.projects[projectIndex],
        offsetAmount: this.projects[projectIndex].offsetAmount + project.offsetAmount,
      };
    } else {
      this.projects.push(project);
    }

    this.projects.find((pj) => pj.country === project.country && pj.technology === pj.technology);
  }

  async remove(project: Project): Promise<void> {
    if (this.projects.indexOf(project) === -1) {
      throw new Error('This project is not saved before');
    }

    this.projects = this.projects.filter((pj) => pj !== project);
  }

  async filter(filter: Partial<Project>): Promise<Project[] | undefined> {
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

  async getAllProjects(): Promise<Project[]> {
    return this.projects;
  }

  async decreaseOffsetAmount(project: Omit<Project, 'offsetAmount'>, amount: number): Promise<void> {
    const projectIndex = this.projects.indexOf(
      this.projects.find((pj) => pj.country === project.country && pj.technology === project.technology)!
    );

    const newOffsetAmount = this.projects[projectIndex].offsetAmount - amount;

    if (newOffsetAmount <= 0) {
      this.remove(this.projects[projectIndex]);
    } else {
      this.projects[projectIndex] = { ...this.projects[projectIndex], offsetAmount: this.projects[projectIndex].offsetAmount - amount };
    }
  }
}

type Project = {
  technology: string;
  country: string;
  offsetAmount: number;
};
