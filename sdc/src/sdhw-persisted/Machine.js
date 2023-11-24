const MachineModel = require("../models/machineModel")

exports.initializeMachine = async (machine) => {
    try {
        // Check if the machine with the same name already exists
        const existingMachine = await MachineModel.findOne({ name: machine.name });

        if (existingMachine) {
            try {
                // If it exists, delete it
                await MachineModel.deleteOne({ name: machine.name });
                console.log(`✅ Existing machine deleted: ${machine.name}`);
            } catch (error) {
                console.error(`❌ Error deleting existing machine: ${error.message}`);
                throw error;
            }
        }

        // Create a new machine
        const newMachine = new MachineModel(machine);
        const savedMachine = await newMachine.save();
        console.log(`✅ Machine created: ${savedMachine.name}`);

        return savedMachine
    } catch (error) {
        console.error(`❌ Error creating machine: ${error.message}`);
        throw error;
    }
}

exports.getMachine = async (machineName) => {
    try {
        const machine = await MachineModel.findOne({name: machineName}).populate("container_deployments", "")

        return machine
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        throw error;
    }
}

exports.getMachineList = async () => {
    try {
        const machineList = await MachineModel.find({}).populate("container_deployments", "")

        return machineList
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        throw error;
    }
}