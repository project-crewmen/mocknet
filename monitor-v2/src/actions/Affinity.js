const AffinityModel = require("../models/affinityModel")

const { calculateAffinityFactor, calculateAffinityCost, calculateNetCost, calculateAverageAffinityCost } = require("../utils/affinityHelper")

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

exports.getAffinityFactor = async (src, dest) => {
    try {
        let aff = await AffinityModel.findOne({ src: src, dest: dest })

        if (aff === null) {
            aff = await AffinityModel.findOne({ src: dest, dest: src })
        }

        let totalM = 0
        let totalD = 0

        let affList = await AffinityModel.find({})

        for (const a of affList) {
            totalM = totalM + a.messagesPassed
            totalD = totalD + a.dataExchanged
        }

        const AF_x_y = calculateAffinityFactor(aff.messagesPassed, totalM, aff.dataExchanged, totalD, w=0.5)

        return AF_x_y
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        throw error;
    }
}

exports.getAffinityFactorList = async () => {
    try {
        let totalM = 0
        let totalD = 0

        let AFF_List = []

        let affList = await AffinityModel.find({})

        for (const a of affList) {
            totalM = totalM + a.messagesPassed
            totalD = totalD + a.dataExchanged
        }

        for (const a of affList) {
            const AF_x_y = calculateAffinityFactor(a.messagesPassed, totalM, a.dataExchanged, totalD, w=0.5)

            AFF_List.push({
                src: a.src,
                dest: a.dest,
                AF_x_y: AF_x_y
            })
        }
        
        return AFF_List
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        throw error;
    }
}