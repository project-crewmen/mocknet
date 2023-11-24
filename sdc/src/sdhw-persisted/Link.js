const LinkModel = require("../models/linkModel")

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