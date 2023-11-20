class ContainerDeployment {
    constructor(containerData) {
        this.containerName = containerData.container_name;
        this.image = containerData.image;
        this.portMappings = containerData.port_mappings;
        this.resourceRequirements = containerData.resource_requirements;
    }
}

module.exports = ContainerDeployment