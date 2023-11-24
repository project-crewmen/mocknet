const mongoose = require("mongoose");

const affinitySchema = new mongoose.Schema({
    src: {type: String},
    dest: {type: String},
    messagesPassed: {type: Number, default: 0},
    dataExchanged: {type: Number, default: 0},
})

const Affinity = mongoose.model("Affinity", affinitySchema)

module.exports = Affinity