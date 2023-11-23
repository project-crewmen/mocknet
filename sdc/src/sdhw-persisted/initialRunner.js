// SDHW
const Machine = require("./Machine")
const Link = require("./Link")

// Data
const network_data = require("../data/network")
const machine_data = require("../data/machines")
const links_data = require("../data/links")

var loaded_machines = []
var loaded_links = []

const run = async () => {
    // initializeMachines()
    /* 1. Spin the machines */
    console.log("\n--- Spin up Machines ---");

    for (const net of network_data.network) {
        // Extract source and destination machines
        let sourceMachine = net.machines.source.name;
        let destinationMachine = net.machines.destination.name;

        // Find the source machine in the machineData list
        let sourceMachineData = machine_data.machines.find(m => m.name === sourceMachine);

        // Find the destination machine in the machineData list
        let destinationMachineData = machine_data.machines.find(m => m.name === destinationMachine);

        // Function to check if machine is already loaded
        const isMachineLoaded = (machine) => loaded_machines.some(m => m.name === machine.name);

        // Push the machines to loaded_machines list (if not already added)
        if (sourceMachineData && !isMachineLoaded(sourceMachineData)) {
            const new_machine = await Machine.initializeMachine(sourceMachineData);

            if (new_machine != null) { loaded_machines.push(new_machine); }
        }

        if (destinationMachineData && !isMachineLoaded(destinationMachineData)) {
            const new_machine = await Machine.initializeMachine(destinationMachineData);

            if (new_machine != null) { loaded_machines.push(new_machine); }
        }
    }

    /* 2. Establish links */
    console.log("\n--- Establish Links ---");

    for (const net of network_data.network) {
        // Extract the used link
        let usedLink = net.link.name;

        // Find the link in the linkData list
        let usedLinkData = links_data.links.find(l => l.name === usedLink);

        // Function to check if machine is already loaded
        const isLinkLoaded = (link) => loaded_links.some(l => l.name === link.name);

        // Push the machines to loaded_machines list (if not already added)
        if (usedLinkData && !isLinkLoaded(usedLinkData)) {
            const new_link = await Link.initializeLink(usedLinkData);

            if (new_link != null) { loaded_links.push(new_link); }
        }
    }
}







module.exports = { run }