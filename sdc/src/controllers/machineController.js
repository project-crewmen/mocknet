const Machine = require("../sdhw-persisted/Machine")

// Machine
exports.getMachine = async (req, res) => {
    const data = await Machine.getMachine(req.params['machineName'])

    res.status(200).json({ machine: data });
}

exports.getMachineList = async (req, res) => {
    const data = await Machine.getMachineList()

    res.status(200).json({ machineList: data });
}