class ContainerDeployment {
    constructor(containerData) {
        this.name = containerData.container_name;
        this.image = containerData.image;
        this.portMappings = containerData.port_mappings;
        this.resourceRequirements = containerData.resource_requirements;
    }

    getContainerData() {
        return {
          name: this.name,
          image: this.image,
          portMappings: this.portMappings,
          resourceRequirements: this.resourceRequirements
        }
      }
}

module.exports = ContainerDeployment