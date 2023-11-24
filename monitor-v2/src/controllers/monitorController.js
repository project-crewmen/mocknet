const Affinity = require("../actions/Affinity")

exports.getAffinity = async (req, res) => {
    const affinity = await Affinity.getAffinity(req.params['src'], req.params['dest'])

    res.status(200).json({ affinity: affinity });
}

exports.getAffinityList = async (req, res) => {
    const affinityList = await Affinity.getAffinityList()

    res.status(200).json({ affinityList: affinityList });
}

exports.getAffinityFactor = async (req, res) => {
    const affinityFactor = await Affinity.getAffinityFactor(req.params['src'], req.params['dest'])

    res.status(200).json({ affinityFactor: affinityFactor });
}

exports.getAffinityFactorList = async (req, res) => {
    const affinityFactorList = await Affinity.getAffinityFactorList()

    res.status(200).json({ affinityFactorList: affinityFactorList });
}

exports.getAffinityCost = async (req, res) => {
    const affinityCost = await Affinity.getAffinityCost(req.params['src'], req.params['dest'])

    res.status(200).json({ affinityCost: affinityCost });
}

exports.getAffinityCostList = async (req, res) => {
    const affinityCostList = await Affinity.getAffinityCostList()

    res.status(200).json({ affinityCostList: affinityCostList });
}