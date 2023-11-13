const Network = require("../models/networkModel")

const { createWeightedMatrix, getEdgePairs,getCommunicationAffinityList } = require("../monitor/monitor")

exports.getStats = async (req, res) => {
    const communications = await Network.find()

    // Get the nodes and weighted matrix
    const { nodes, messagePassedMatrix, dataExchangedMatrix } = createWeightedMatrix(communications);

    // Get the edge pairs
    const messagesPassedEdges = getEdgePairs(nodes, messagePassedMatrix);

    // Get the edge pairs
    const dataExchangedEdges = getEdgePairs(nodes, dataExchangedMatrix);

    // Get the affinities
    const communicationAffinities = getCommunicationAffinityList(messagesPassedEdges, dataExchangedEdges)

    data = {
        nodes: nodes,

        messagePassedMatrix: messagePassedMatrix,
        messagesPassedEdges: messagesPassedEdges,

        dataExchangedMatrix: dataExchangedMatrix,
        dataExchangedEdges: dataExchangedEdges,

        communicationAffinities: communicationAffinities,
    }

    res.status(200).json({data: data});
}