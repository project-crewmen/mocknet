exports.link01 = {
    name: "link-01",
    type: "Ethernet",
    bandwidth: "1 Gbps",
    latency: "5 ms",
    jitter: "1 ms",
    packet_loss: "0.1%",
    reliability: "99.9%",
    duplex_mode: "Full",
    physical_medium: "Copper",
    distance: "10 meters",
    qos_parameters: {
        priority: "High",
        service_level: "Best Effort"
    },
    redundancy: true,
    security: {
        encryption: "AES-256",
        authentication: "WPA2-PSK"
    },
    scalability: "High",
    protocol: "TCP/IP",
    error_handling: "Automatic",
    compatibility: "IEEE 802.3",
    cost: "$500",
    configuration_management: "Manual",
    automation: "None"
}

exports.link02 = {
    name: "link-02",
    type: "Ethernet",
    bandwidth: "1 Gbps",
    latency: "5 ms",
    jitter: "1 ms",
    packet_loss: "0.1%",
    reliability: "99.9%",
    duplex_mode: "Full",
    physical_medium: "Copper",
    distance: "10 meters",
    qos_parameters: {
        priority: "High",
        service_level: "Best Effort"
    },
    redundancy: true,
    security: {
        encryption: "AES-256",
        authentication: "WPA2-PSK"
    },
    scalability: "High",
    protocol: "TCP/IP",
    error_handling: "Automatic",
    compatibility: "IEEE 802.3",
    cost: "$500",
    configuration_management: "Manual",
    automation: "None"
};

exports.link03 = {
    name: "link-03",
    type: "Ethernet",
    bandwidth: "1 Gbps",
    latency: "5 ms",
    jitter: "1 ms",
    packet_loss: "0.1%",
    reliability: "99.9%",
    duplex_mode: "Full",
    physical_medium: "Copper",
    distance: "10 meters",
    qos_parameters: {
        priority: "High",
        service_level: "Best Effort"
    },
    redundancy: true,
    security: {
        encryption: "AES-256",
        authentication: "WPA2-PSK"
    },
    scalability: "High",
    protocol: "TCP/IP",
    error_handling: "Automatic",
    compatibility: "IEEE 802.3",
    cost: "$500",
    configuration_management: "Manual",
    automation: "None"
};


exports.links = [
    this.link01,
    this.link02,
    this.link03
];