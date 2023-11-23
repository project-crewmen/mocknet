const AffinityModel = require("../models/affinityModel")

exports.getAffinity = async (src, dest) => {
    try {
        let aff = await AffinityModel.findOne({ src: src, dest: dest })

        if (aff === null) {
            aff = await AffinityModel.findOne({ src: dest, dest: src })
        }

        return aff
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        throw error;
    }
}

exports.getAffinityList = async () => {
    try {
        let affList = await AffinityModel.findOne({})

        return affList
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        throw error;
    }
}