class CPU {
    constructor(cpuData) {
        this.model = cpuData.model;
        this.cores = cpuData.cores;
        this.threads = cpuData.threads;
        this.clockSpeed = cpuData.clockSpeed;
    }
}

module.exports = CPU