const Link = require("../sdhw-persisted/Link")

// Link
exports.getLink = async (req, res) => {
    const data = await Link.getLink(req.params["linkName"])

    res.status(200).json({ link: data });
}

exports.getLinkList = async (req, res) => {
    const data = await Link.getLinkList()

    res.status(200).json({ linkList: data });
}

exports.getContainerLink = async (req, res) => {
    const data = await Link.getContainerLink(req.params["srcContainer"], req.params['destContainer'])

    res.status(200).json({ containerLink: data });
}