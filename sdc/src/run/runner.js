// Load Specifications
const machines = require("../data/machines.json")
const links = require("../data/links.json")
const network = require("../data/network.json")

const CPU = require("../sdhw/machine/_com/CPU")
const Memory = require("../sdhw/machine/_com/Memory")
const Storage = require("../sdhw/machine/_com/Storage")
const NetworkInterface = require("../sdhw/machine/_com/NetworkInterface")
const ContainerDeployment = require("../sdhw/machine/_com/ContainerDeployment")
const Machine = require("../sdhw/machine/Machine")

const Link = require("../sdhw/link/Link")

exports.run = () => {
    /* 1. Spin the machines */
    console.log("\n--- Spin up Machines ---");
    var loaded_machines = []

    for (const net of network.network) {
        // Extract source and destination machines
        let sourceMachine = net.machines.source;
        let destinationMachine = net.machines.destination;

        // Find the source machine in the machineData list
        let sourceMachineData = machines.machines.find(machine => machine.name === sourceMachine);

        // Find the destination machine in the machineData list
        let destinationMachineData = machines.machines.find(machine => machine.name === destinationMachine);

        // Function to check if machine is already loaded
        const isMachineLoaded = (machine) => loaded_machines.some(loadedMachine => loadedMachine.name === machine.name);

        // Push the machines to loaded_machines list (if not already added)
        if (sourceMachineData && !isMachineLoaded(sourceMachineData)) {
            const new_machine = initializeMachine(sourceMachineData, "Running");

            if (new_machine != null) { loaded_machines.push(new_machine); }
        }

        if (destinationMachineData && !isMachineLoaded(destinationMachineData)) {
            const new_machine = initializeMachine(destinationMachineData);
            if (new_machine != null) { loaded_machines.push(new_machine); }
        }
    }

    /* 2. Establish links */
    console.log("\n--- Establish Links ---");
    var loaded_links = []

    for (const link of links.links) {
        const new_link = initializeLink(link)

        if (new_link != null) { loaded_links.push(new_link); }
    }

    
    const connections = initializeConnections(network, loaded_machines)

    // Print the containers alongside respective machine
    console.log("\n-- Container Deployements --");
    console.log(`Machine name | Container deployments`);

    for (let i = 0; i < loaded_machines.length; i++) {
        const machine = loaded_machines[i];
        const containerNames = machine.containerDeployments.map(deployment => deployment.containerName).join(", ");
        console.log(`${machine.name}\t${containerNames}`);
    }
}

function initializeMachine(machineData, state) {
    const cpu = new CPU(machineData.cpu)
    const memory = new Memory(machineData.memory)
    const storage = new Storage(machineData.storage)
    const networkInterfaces = machineData.network_interfaces.map(interfaceData => {
        return new NetworkInterface(interfaceData.name, interfaceData.ip_address, interfaceData.mac_address);
    });
    const containerDeployments = machineData.container_deployments.map(containerData => {
        return new ContainerDeployment(containerData);
    });

    //   Create a machine
    const machine = new Machine(
        machineData.name,
        machineData.operating_system,
        machineData.architecture,
        cpu,
        memory,
        storage,
        networkInterfaces,
        state,
        containerDeployments
    )

    if (machine) {
        console.log(`✅ Machine:${machine.name} turned on`);
        return machine
    }
    else {
        console.error(`❌ Machine starting failed`);
        return null
    }
}

function initializeLink(linkData) {
    const link = new Link(linkData)

    if (link) {
        console.log(`✅ Link:${link.name} loaded`);
        return link
    }
    else {
        console.error(`❌ Link loading failed`);
        return null
    }
}

function initializeConnections(network, loaded_machines) {
    // Create an empty adjacency matrix with all values initialized to 0
    const numMachines = loaded_machines.length;
    const adjacencyMatrix = Array.from({ length: numMachines }, () => Array(numMachines).fill(0));

    // Function to get the index of a machine in loaded_machines array
    const getMachineIndex = (machineName) => loaded_machines.findIndex(machine => machine.name === machineName);

    // Update the adjacency matrix based on the new network data
    for (const networkEntry of network.network) {
        const sourceIndex = getMachineIndex(networkEntry.machines.source);
        const destinationIndex = getMachineIndex(networkEntry.machines.destination);

        // Update the matrix to indicate a link between source and destination
        adjacencyMatrix[sourceIndex][destinationIndex] = networkEntry.link;
        adjacencyMatrix[destinationIndex][sourceIndex] = networkEntry.link; // Assuming the link is bidirectional
    }

    // Print the adjacency matrix with machine names
    const machineNames = loaded_machines.map(machine => machine.name);

    console.log("\n-- Link Connections: Adjacency Matrix --");
    console.log(`\t${machineNames.join("\t")}`);

    for (let i = 0; i < numMachines; i++) {
        console.log(`${machineNames[i]}\t${adjacencyMatrix[i].join("\t")}`);
    }

    return adjacencyMatrix
}