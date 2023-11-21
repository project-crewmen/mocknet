const { getMachineData } = require("../sdhw/runner")

// Machine
exports.getMachine = async (req, res) => {
    const data = getMachineData(req.params['machineName'])

    res.status(200).json({ machineData: data });
}