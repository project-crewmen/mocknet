const Network = require("../sdhw-persisted/Network")
const Machine = require("../sdhw-persisted/Machine")

// Network
exports.getLinkForMachines = async (req, res) => {
    const srcMachine = await Machine.getMachine(req.params['src'])
    const destMachine = await Machine.getMachine(req.params['dest'])

    if (srcMachine && destMachine) {
        const link = await Network.getAssociatedLink(srcMachine._id, destMachine._id)

        res.status(200).json({ link: link });
    } else {
        res.status(404).json({ link: null });
    }
}