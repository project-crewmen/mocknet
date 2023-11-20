class NetworkInterface {
    constructor(nicData) {
        this.name = nicData.name;
        this.ipAddress = nicData.ipAddress;
        this.macAddress = nicData.macAddress;
    }
}

module.exports = NetworkInterface