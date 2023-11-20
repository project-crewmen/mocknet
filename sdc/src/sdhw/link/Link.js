class Link {
    constructor(data) {
        this.name = data.name;
        this.type = data.type;
        this.bandwidth = data.bandwidth;
        this.latency = data.latency;
        this.jitter = data.jitter;
        this.packet_loss = data.packet_loss;
        this.reliability = data.reliability;
        this.duplex_mode = data.duplex_mode;
        this.physical_medium = data.physical_medium;
        this.distance = data.distance;
        this.qos_parameters = data.qos_parameters;
        this.redundancy = data.redundancy;
        this.security = data.security;
        this.scalability = data.scalability;
        this.protocol = data.protocol;
        this.error_handling = data.error_handling;
        this.compatibility = data.compatibility;
        this.cost = data.cost;
        this.configuration_management = data.configuration_management;
        this.automation = data.automation;
    }
}

module.exports = Link