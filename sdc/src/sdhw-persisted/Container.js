const ContainerModel = require("../models/containerModel")
const MachineModel = require("../models/machineModel") 

exports.getContainer = async (machineName, containerName) => {
    try {
        const machines = await MachineModel.findOne({name: machineName}).populate("container_deployments", "")

        const c = machines.container_deployments.find(c => c.name === containerName)

        return c
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        throw error;
    }
}

exports.getContainerList = async (machineName) => {
    try {
        const machines = await MachineModel.findOne({name: machineName}).populate("container_deployments", "")

        return machines.container_deployments
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        throw error;
    }
}

exports.startContainer = async (machineName, container) => {
    try {
        // Check if the container with the same name already exists
        const existingContainer = await ContainerModel.findOne({ name: container.name });

        if (existingContainer) {
            try {
                // If it exists, delete it
                await ContainerModel.deleteOne({ name: container.name });
                console.log(`✅ Existing container deleted: ${container.name}`);
            } catch (error) {
                console.error(`❌ Error deleting existing container: ${error.message}`);
                throw error;
            }
        }

        // Create a new container
        const newContainer = new ContainerModel(container);
        const savedContainer = await newContainer.save();
        console.log(`✅ Container created: ${savedContainer.name}`);

        // Add the container to the machine
        const machine = await MachineModel.findOne({name: machineName})

        if(!machine.container_deployments.includes(savedContainer._id)){
            await machine.updateOne({$push: {container_deployments: savedContainer._id}})
        }

        return savedContainer
    } catch (error) {
        console.error(`❌ Error creating container: ${error.message}`);
        throw error;
    }
}