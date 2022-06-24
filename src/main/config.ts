export class Config {
  execute(applications: Application[]): Server[] {
    let servers: Server[] = [];
    applications.forEach((application) => {
      if (
        servers.find((server) => {
          return server.add(application);
        })
      ) {
        return;
      } else {
        const server = new Server();
        servers.push(server);
        server.add(application);
      }
    });

    return servers;
  }
}

export type Application = {
  CPU: number;
  RAM: number;
  disk: number;
};

export class Server {
  private CPU: number;
  private RAM: number;
  private disk: number;

  private applications: Application[] = [];

  constructor(CPU: number = 5, RAM: number = 5, disk: number = 5) {
    this.CPU = CPU;
    this.RAM = RAM;
    this.disk = disk;
  }

  add(application: Application): boolean {
    if (this.CPU - application.CPU < 0 || this.RAM - application.RAM < 0 || this.disk - application.disk < 0) {
      return false;
    }
    this.applications.push(application);
    this.CPU = this.CPU - application.CPU;
    this.RAM = this.RAM - application.RAM;
    this.disk = this.disk - application.disk;
    return true;
  }
}
