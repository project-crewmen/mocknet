const data = [
    { type: "message-passed", amount: 200 },
    { type: "data-exchanged", size: 1024 },
];

exports.getStats = async (req, res) => {
    res.json(data);
}