const LinkModel = require("../models/linkModel")
const ContainerModel = require("../models/containerModel")
const NetworkModel = require("../models/networkModel")

exports.clearLinks = async () => {
    try {
        // Check if the network instance already exists
        const existingLinks = await LinkModel.findOne({});

        if (existingLinks) {
            try {
                // If it exists, delete it
                await LinkModel.deleteMany({});
                console.log(`✅ Existing links deleted`);
            } catch (error) {
                console.error(`❌ Error deleting existing links: ${error.message}`);
                throw error;
            }
        }
    } catch (error) {
        console.error(`❌ Error creating links instance: ${error.message}`);
        throw error;
    }
}

exports.initializeLink = async (link) => {
    try {
        // Check if the link with the same name already exists
        const existingLink = await LinkModel.findOne({ name: link.name });

        if (existingLink) {
            try {
                // If it exists, delete it
                await LinkModel.deleteOne({ name: link.name });
                console.log(`✅ Existing link deleted: ${link.name}`);
            } catch (error) {
                console.error(`❌ Error deleting existing link: ${error.message}`);
                throw error;
            }
        }

        // Create a new machine
        const newLink = new LinkModel(link);
        const savedLink = await newLink.save();
        console.log(`✅ Link created: ${savedLink.name}`);

        return savedLink
    } catch (error) {
        console.error(`❌ Error creating link: ${error.message}`);
        throw error;
    }
}

exports.getLink = async (linkName) => {
    try {
        const link = await LinkModel.findOne({ name: linkName })

        return link
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        throw error;
    }
}

exports.getLinkList = async () => {
    try {
        const link = await LinkModel.find({})

        return link
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        throw error;
    }
}

exports.getContainerLink = async (srcContainer, destContainer) => {
    try {
        const srcCont = await ContainerModel.findOne({ name: srcContainer })
        const destCont = await ContainerModel.findOne({ name: destContainer })

        const link = await NetworkModel.findOne({ machines: { source: srcCont.deployed_machine, destination: destCont.deployed_machine } }).populate("link", "")

        if (link) {
            return {
                latency: link.link.latency
            }
        } else {
            return null
        }
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        throw error;
    }
}