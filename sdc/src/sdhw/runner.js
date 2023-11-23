// // Load Specifications
// const machines = require("../data/machines.json")
// const links = require("../data/links.json")
// const network = require("../data/network.json")

// const CPU = require("./machine/_com/CPU")
// const Memory = require("./machine/_com/Memory")
// const Storage = require("./machine/_com/Storage")
// const NetworkInterface = require("./machine/_com/NetworkInterface")
// const ContainerDeployment = require("./machine/_com/ContainerDeployment")
// const Machine = require("./machine/Machine")

// const Link = require("./link/Link")

// var loaded_machines = []
// var loaded_links = []
// var adjacencyMatrix = []

// const run = () => {
//     /* 1. Spin the machines */
//     console.log("\n--- Spin up Machines ---");

//     for (const net of network.network) {
//         // Extract source and destination machines
//         let sourceMachine = net.machines.source;
//         let destinationMachine = net.machines.destination;

//         // Find the source machine in the machineData list
//         let sourceMachineData = machines.machines.find(machine => machine.name === sourceMachine);

//         // Find the destination machine in the machineData list
//         let destinationMachineData = machines.machines.find(machine => machine.name === destinationMachine);

//         // Function to check if machine is already loaded
//         const isMachineLoaded = (machine) => loaded_machines.some(loadedMachine => loadedMachine.name === machine.name);

//         // Push the machines to loaded_machines list (if not already added)
//         if (sourceMachineData && !isMachineLoaded(sourceMachineData)) {
//             const new_machine = initializeMachine(sourceMachineData, "Running");

//             if (new_machine != null) { loaded_machines.push(new_machine); }
//         }

//         if (destinationMachineData && !isMachineLoaded(destinationMachineData)) {
//             const new_machine = initializeMachine(destinationMachineData);
//             if (new_machine != null) { loaded_machines.push(new_machine); }
//         }
//     }

//     /* 2. Establish links */
//     console.log("\n--- Establish Links ---");

//     for (const link of links.links) {
//         const new_link = initializeLink(link)

//         if (new_link != null) { loaded_links.push(new_link); }
//     }


//     const connections = initializeConnections(network, loaded_machines)

//     // Print the containers alongside respective machine
//     console.log("\n-- Container Deployements --");
//     console.log(`Machine name | Container deployments`);

//     for (let i = 0; i < loaded_machines.length; i++) {
//         const machine = loaded_machines[i];
//         const containerNames = machine.containerDeployments.map(deployment => deployment.name).join(", ");
//         console.log(`${machine.name}\t${containerNames}`);
//     }
// }

// function initializeMachine(machineData, state) {
//     const cpu = new CPU(machineData.cpu)
//     const memory = new Memory(machineData.memory)
//     const storage = new Storage(machineData.storage)
//     const networkInterfaces = machineData.network_interfaces.map(interfaceData => {
//         return new NetworkInterface(interfaceData.name, interfaceData.ip_address, interfaceData.mac_address);
//     });
//     const containerDeployments = machineData.container_deployments.map(containerData => {
//         return new ContainerDeployment(containerData);
//     });

//     //   Create a machine
//     const machine = new Machine(
//         machineData.name,
//         machineData.operating_system,
//         machineData.architecture,
//         cpu,
//         memory,
//         storage,
//         networkInterfaces,
//         state,
//         containerDeployments
//     )

//     if (machine) {
//         console.log(`✅ Machine:${machine.name} turned on`);
//         return machine
//     }
//     else {
//         console.error(`❌ Machine starting failed`);
//         return null
//     }
// }

// function initializeLink(linkData) {
//     const link = new Link(linkData)

//     if (link) {
//         console.log(`✅ Link:${link.name} loaded`);
//         return link
//     }
//     else {
//         console.error(`❌ Link loading failed`);
//         return null
//     }
// }

// function initializeConnections(network, loaded_machines) {
//     // Create an empty adjacency matrix with all values initialized to 0
//     const numMachines = loaded_machines.length;
//     adjacencyMatrix = Array.from({ length: numMachines }, () => Array(numMachines).fill(0));

//     // Function to get the index of a machine in loaded_machines array
//     const getMachineIndex = (machineName) => loaded_machines.findIndex(machine => machine.name === machineName);

//     // Update the adjacency matrix based on the new network data
//     for (const networkEntry of network.network) {
//         const sourceIndex = getMachineIndex(networkEntry.machines.source);
//         const destinationIndex = getMachineIndex(networkEntry.machines.destination);

//         // Update the matrix to indicate a link between source and destination
//         adjacencyMatrix[sourceIndex][destinationIndex] = networkEntry.link;
//         adjacencyMatrix[destinationIndex][sourceIndex] = networkEntry.link; // Assuming the link is bidirectional
//     }

//     // Print the adjacency matrix with machine names
//     const machineNames = loaded_machines.map(machine => machine.name);

//     console.log("\n-- Link Connections: Adjacency Matrix --");
//     console.log(`\t${machineNames.join("\t")}`);

//     for (let i = 0; i < numMachines; i++) {
//         console.log(`${machineNames[i]}\t${adjacencyMatrix[i].join("\t")}`);
//     }

//     return adjacencyMatrix
// }

// // Machine
// function getMachineData(name) {
//     let machine = loaded_machines.find(m => m.name === name)

//     if (machine) {
//         return machine.getMachineData()
//     } else {
//         return null
//     }
// }

// // Link
// function getMainLinkPropertiesForMachines(src, dest) {
//     // Function to get the index of a machine in loaded_machines array
//     const getMachineIndex = (machineName) => loaded_machines.findIndex(machine => machine.name === machineName);

//     let associated_link = loaded_links.find(link => link.name === adjacencyMatrix[getMachineIndex(src)][getMachineIndex(dest)]);

//     if (associated_link) {
//         return associated_link.getMainLinkProperties()
//     } else {
//         return null
//     }
// }

// // Container
// function getContainerData(machineName, containerName) {
//     let machine = loaded_machines.find(m => m.name === machineName)

//     if (machine) {
//         let container = machine.getContainer(containerName)

//         if (container) {
//             return container
//         } else {
//             return null
//         }
//     } else {
//         return null
//     }
// }

// function getContainerList(machineName) {
//     let machine = loaded_machines.find(m => m.name === machineName)

//     if (machine) {
//         let containers = machine.getContainerList()

//         if (containers) {
//             return containers
//         } else {
//             return null
//         }
//     } else {
//         return null
//     }
// }



// function startContainer(machineName, containerData) {
//     let machine = loaded_machines.find(m => m.name === machineName)

//     if (machine) {
//         let new_container = machine.startContainer(containerData)

//         if (new_container) {
//             return new_container
//         } else {
//             return null
//         }
//     } else {
//         return null
//     }
// }

// function stopContainer(machineName, containerName) {
//     let machine = loaded_machines.find(m => m.name === machineName)

//     if (machine) {
//         let updated_container = machine.stopContainer(containerName)

//         if (updated_container) {
//             return updated_container
//         } else {
//             return null
//         }
//     } else {
//         return null
//     }
// }

// function removeContainer(machineName, containerName) {
//     let machine = loaded_machines.find(m => m.name === machineName)

//     if (machine) {
//         let is_removed = machine.removeContainer(containerName)

//         if (is_removed) {
//             return true
//         } else {
//             return null
//         }
//     } else {
//         return null
//     }
// }

// module.exports = {
//     run,

//     // Machine
//     getMachineData,

//     // Link
//     getMainLinkPropertiesForMachines,

//     // Container
//     getContainerData,
//     getContainerList,
//     startContainer,
//     stopContainer,
//     removeContainer
// }