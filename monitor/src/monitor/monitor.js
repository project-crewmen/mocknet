const { sleep } = require("../utils/utils");
const Network = require("../models/networkModel")

// Function to create a matrix with weights based on messagesPassed
const createWeightedMatrix = (data) => {
    // Get distinct nodes
    const nodes = Array.from(new Set(data.flatMap(item => [item.sender, item.receiver])));

    // Initialize an empty matrix
    const messagePassedMatrix = Array.from({ length: nodes.length }, () => Array(nodes.length).fill(0));
    const dataExchangedMatrix = Array.from({ length: nodes.length }, () => Array(nodes.length).fill(0));

    // Populate the matrix with weights based on messagesPassed
    data.forEach(item => {
        const senderIndex = nodes.indexOf(item.sender);
        const receiverIndex = nodes.indexOf(item.receiver);
        messagePassedMatrix[senderIndex][receiverIndex] = item.messagesPassed;
        dataExchangedMatrix[senderIndex][receiverIndex] = item.dataExchanged;
    });

    return { nodes, messagePassedMatrix, dataExchangedMatrix };
}

// Function to get edge pairs from the matrix
const getEdgePairs = (nodes, matrix) => {
    const edges = [];

    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            if (matrix[i][j] > 0 || matrix[j][i] > 0) {
                edges.push({ node1: nodes[i], node2: nodes[j], weight: matrix[i][j] + matrix[j][i] });
            }
        }
    }

    return edges;
}

// Function to get the sum of weights for relevant items in two lists
const getCommunicationAffinityList = (messagePassedList, dataExchangedList) => {
    const affList = [];

    messagePassedList.forEach(mpItem => {
        const deItem = dataExchangedList.find(deItem =>
            (mpItem.node1 === deItem.node1 && mpItem.node2 === deItem.node2) ||
            (mpItem.node1 === deItem.node2 && mpItem.node2 === deItem.node1)
        );

        if (deItem) {
            affList.push({
                node1: mpItem.node1,
                node2: mpItem.node2,
                affinity: calculateCommunicationAffinity(mpItem.weight, deItem.weight)
            });
        }
    });

    return affList;
}

const calculateCommunicationAffinity = (msgAmount, dataAmount, weight = 0.5) => {
    const affinity = msgAmount * weight + dataAmount * (1 - weight)

    return affinity
}

const monitor = async (req, res) => {
    while (true) {
        const communications = await Network.find()

        // Get the nodes and weighted matrix
        console.log(communications);
        const { nodes, messagePassedMatrix, dataExchangedMatrix } = createWeightedMatrix(communications);

        // Display the nodes and matrix
        console.log('Nodes:', nodes);
        console.log('Weighted Message Passed Matrix:');
        messagePassedMatrix.forEach(row => console.log(row.join('\t')));

        // Get the edge pairs
        const messagesPassedEdges = getEdgePairs(nodes, messagePassedMatrix);
        console.log('Message Passed Edge Pairs:\n', messagesPassedEdges);

        console.log("\n");

        console.log('Nodes:', nodes);
        console.log('Weighted Data Exchanged Matrix:');
        dataExchangedMatrix.forEach(row => console.log(row.join('\t')));

        // Get the edge pairs
        const dataExchangedEdges = getEdgePairs(nodes, dataExchangedMatrix);
        console.log('Data Exchanged Edge Pairs:\n', dataExchangedEdges);

        // Get the affinities
        const communicationAffinities = getCommunicationAffinityList(messagesPassedEdges, dataExchangedEdges)
        console.log('Communication Affinity Edge Pairs:\n', communicationAffinities);

        // Delay
        const globalDelay = 5000; // Random delay between 1 and 5 seconds
        console.log(`--- wait ${globalDelay}ms until next round of monitoring ---`)
        await sleep(globalDelay);
    }
};

module.exports = { createWeightedMatrix, getEdgePairs,getCommunicationAffinityList, calculateCommunicationAffinity, monitor }

