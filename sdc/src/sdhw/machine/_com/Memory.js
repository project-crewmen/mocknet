class Memory {
    constructor(memoryData) {
        this.total = memoryData.total;
        this.type = memoryData.type;
        this.speed = memoryData.speed;
    }
}

module.exports = Memory