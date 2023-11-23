const NetworkModel = require("../models/networkModel")

exports.clearNetwork = async (network) => {
    try {
        // Check if the network instance already exists
        const existingNet = await NetworkModel.findOne({});

        if (existingNet) {
            try {
                // If it exists, delete it
                await NetworkModel.deleteMany({});
                console.log(`✅ Existing network deleted`);
            } catch (error) {
                console.error(`❌ Error deleting existing network: ${error.message}`);
                throw error;
            }
        }
    } catch (error) {
        console.error(`❌ Error creating network instance: ${error.message}`);
        throw error;
    }
}

exports.initializeNetwork = async (network) => {
    try {
        // Create a new network
        const newNet = new NetworkModel(network);
        const savedNet = await newNet.save();
        console.log(`✅ Network instance created: ${savedNet._id}`);

        return savedNet
    } catch (error) {
        console.error(`❌ Error creating network instance: ${error.message}`);
        throw error;
    }
}

exports.getAssociatedLink = async (srcMachine, destMachine) => {
    try {
        const link = await NetworkModel.findOne({machines: {source: srcMachine, destination: destMachine}}).populate("link", "")

        if(link){
            return link.link
        } else {
            return null
        }
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        throw error;
    }
}