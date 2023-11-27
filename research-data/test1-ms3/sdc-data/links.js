exports.link01 = {
    name: "link-01",
    type: "Fiber Optic",
    bandwidth: "10 Gbps",
    latency: "2 ms",
    jitter: "0.5 ms",
    packet_loss: "0.05%",
    reliability: "99.99%",
    duplex_mode: "Full",
    physical_medium: "Fiber Optic",
    distance: "50 meters",
    protocol: "UDP/IP",
};

exports.link02 = {
    name: "link-02",
    type: "Wireless",
    bandwidth: "500 Mbps",
    latency: "10 ms",
    jitter: "2 ms",
    packet_loss: "0.2%",
    reliability: "99%",
    duplex_mode: "Half",
    physical_medium: "Radio Waves",
    distance: "100 meters",
    protocol: "802.11ac",
};

exports.link03 = {
    name: "link-03",
    type: "Satellite",
    bandwidth: "2 Mbps",
    latency: "500 ms",
    jitter: "50 ms",
    packet_loss: "1%",
    reliability: "95%",
    duplex_mode: "Half",
    physical_medium: "Satellite Signal",
    distance: "Geostationary Orbit",
    protocol: "TCP/IP",
};


exports.links = [
    this.link01,
    this.link02,
    this.link03,
];