const MachineModel = require("../models/machineModel")

const { convertSizeToBytes } = require("../utils/convertor")

exports.clearMachines = async () => {
    try {
        // Check if the network instance already exists
        const existingMachines = await MachineModel.findOne({});

        if (existingMachines) {
            try {
                // If it exists, delete it
                await MachineModel.deleteMany({});
                console.log(`✅ Existing machines deleted`);
            } catch (error) {
                console.error(`❌ Error deleting existing machines: ${error.message}`);
                throw error;
            }
        }
    } catch (error) {
        console.error(`❌ Error creating machines instance: ${error.message}`);
        throw error;
    }
}

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
        const m = {
            ...machine,
            runtime_stack: {
                cpu: 1,
                cpu_allocated: 0,
                memory: convertSizeToBytes(machine.memory.total),
                memory_allocated: 0,
                storage: convertSizeToBytes(machine.storage.capacity),
                storage_allocated: 0,
            }
        }

        const newMachine = new MachineModel(m);
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