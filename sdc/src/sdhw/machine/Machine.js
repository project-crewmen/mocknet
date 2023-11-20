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

  displayInfo() {
    console.log(`Machine Name: ${this.name}`);
    console.log(`Operating System: ${this.operatingSystem}`);
    console.log(`Architecture: ${this.architecture}`);
    console.log(`CPU: ${this.cpu.model}, Cores: ${this.cpu.cores}, Threads: ${this.cpu.threads}, Clock Speed: ${this.cpu.clockSpeed}`);
    console.log(`Memory: ${this.memory.total}, Type: ${this.memory.type}, Speed: ${this.memory.speed}`);
    console.log(`Storage: Type: ${this.storage.type}, Capacity: ${this.storage.capacity}`);
    console.log(`Network Interfaces:`);
    this.networkInterfaces.forEach((nic) => {
      console.log(`  Name: ${nic.name}, IP Address: ${nic.ipAddress}, MAC Address: ${nic.macAddress}`);
    });
    console.log(`State: ${this.state}`);
  }
}

module.exports = Machine