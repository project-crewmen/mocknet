const { getMainLinkPropertiesForMachines } = require("../sdhw/runner")

// Link
exports.getLink = async (req, res) => {
    const data = getMainLinkPropertiesForMachines(req.params['src'], req.params['dest'])

    res.status(200).json({ linkProperties: data });
}