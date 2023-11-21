const mongoose = require("mongoose");

const networkSchema = new mongoose.Schema({
    sender: {type: String},
    receiver: {type: String},
    messagesPassed: {type: Number, default: 0},
    dataExchanged: {type: Number, default: 0},
})

const Network = mongoose.model("Network", networkSchema)

module.exports = Network