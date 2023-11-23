exports.container01 = {
    container_name: "web-app",
    image: "nginx:latest",
    port_mappings: [
        {
            host_port: 8080,
            container_port: 80
        }
    ],
    resource_requirements: {
        cpu: 50,
        memory: "1 GB",
        storage: "500 MB"
    }
}


exports.containers = [
    this.container01,
];