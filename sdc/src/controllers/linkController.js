const Link = require("../sdhw-persisted/Link")

// Link
exports.getLink = async (req, res) => {
    const data = await Link.getLink(req.params["linkName"])

    res.status(200).json({ link: data });
}