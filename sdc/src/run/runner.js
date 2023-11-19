// Load Specifications
const machines = require("../data/machines.json")
const links = require("../data/links.json")
const network = require("../data/network.json")

exports.run = async (req, res) => {
    var loaded_machines = []

    for (const net of network.network) {
        // Extract source and destination machines
        let sourceMachine = net.machines.source;
        let destinationMachine = net.machines.destination;

        // Find the source machine in the machineData list
        let sourceMachineData = machines.machines.find(machine => machine.name === sourceMachine);

        // Find the destination machine in the machineData list
        let destinationMachineData = machines.machines.find(machine => machine.name === destinationMachine);

        // Push the machines to loaded_machines list (if not already added)
        if (sourceMachineData && !loaded_machines.includes(sourceMachineData)) {
            loaded_machines.push({...sourceMachineData, state: "running"});
        }

        if (destinationMachineData && !loaded_machines.includes(destinationMachineData)) {
            loaded_machines.push({...destinationMachineData, state: "running"});
        }
    }

    console.log(loaded_machines);
}