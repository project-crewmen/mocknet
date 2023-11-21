class Machine {
  constructor(name, operatingSystem, architecture, cpu, memory, storage, networkInterfaces, state = "Off", containerDeployments) {
    this.name = name;
    this.operatingSystem = operatingSystem;
    this.architecture = architecture;
    this.cpu = cpu;
    this.memory = memory;
    this.storage = storage;
    this.networkInterfaces = networkInterfaces;
    // Runtime States
    this.state = state;
    this.containerDeployments = containerDeployments
  }

  getMachineData() {
    return {
      name: this.name,
      operatingSystem: this.operatingSystem,
      operatingSystem: this.operatingSystem,
      cpu: this.cpu,
      memory: this.memory,
      storage: this.storage,
      networkInterfaces: this.networkInterfaces,
      state: this.state,
    }
  }

  getContainer(name) {
    let container = this.containerDeployments.find(c => c.name === name)

    if (container) {
        return container.getContainerData()
    } else {
        return null
    }
  }

  getContainerList() {
    return this.containerDeployments
  }
}

module.exports = Machine