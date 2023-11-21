const { getContainerData, getContainerList } = require("../sdhw/runner")

// Container
exports.getContainer = async (req, res) => {
    const data = getContainerData(req.params['machineName'], req.params['containerName'])

    res.status(200).json({ containerData: data });
}

exports.getContainerList = async (req, res) => {
    const data = getContainerList(req.params['machineName'])

    res.status(200).json({ containerList: data });
}

exports.startContainer = async (req, res) => {
    res.status(200).json("startContainer");
}

exports.stopContainer = async (req, res) => {
    res.status(200).json("stopContainer");
}

exports.removeContainer = async (req, res) => {
    res.status(200).json("removeContainer");
}