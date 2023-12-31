exports.machine01 = {
    name: "machine-01",
    operating_system: "Linux",
    architecture: "x86_64",
    cpu: {
        model: "Intel Core i5",
        cores: 4,
        threads: 8,
        clock_speed: "2.8 GHz"
    },
    memory: {
        total: "4 GB",
        type: "DDR4",
        speed: "2133 MHz"
    },
    storage: {
        type: "HDD",
        capacity: "1 TB"
    },
    network_interfaces: {
        name: "eth0",
        ip_address: "192.168.1.10",
        mac_address: "00:1a:2b:3c:4d:5a"
    },
    container_deployments: []
}

exports.machine02 = {
    name: "machine-02",
    operating_system: "Windows",
    architecture: "x86_64",
    cpu: {
        model: "AMD Ryzen 5",
        cores: 6,
        threads: 12,
        clock_speed: "3.0 GHz"
    },
    memory: {
        total: "4 GB",
        type: "DDR4",
        speed: "2666 MHz"
    },
    storage: {
        type: "SSD",
        capacity: "512 GB"
    },
    network_interfaces: {
        name: "eth0",
        ip_address: "192.168.1.11",
        mac_address: "00:1a:2b:3c:4d:5b"
    },
    container_deployments: []
}

exports.machine03 = {
    name: "machine-03",
    operating_system: "Linux",
    architecture: "ARM",
    cpu: {
        model: "ARM Cortex-A72",
        cores: 8,
        threads: 8,
        clock_speed: "2.0 GHz"
    },
    memory: {
        total: "8 GB",
        type: "LPDDR4",
        speed: "1600 MHz"
    },
    storage: {
        type: "NVMe SSD",
        capacity: "256 GB"
    },
    network_interfaces: {
        name: "eth0",
        ip_address: "192.168.1.12",
        mac_address: "00:1a:2b:3c:4d:5c"
    },
    container_deployments: []
}

exports.machines = [
    this.machine01,
    this.machine02,
    this.machine03,
];