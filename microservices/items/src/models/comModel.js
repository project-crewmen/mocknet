const mongoose = require("mongoose");

const itemsComSchema = new mongoose.Schema({
    serviceRequests: [
        {
            dest: { type: String },
            requestDelay: { type: Number, default: 0 }
        }
    ],
    serviceDelay: { type: Number, default: 0 },
})

const ItemsCommunication = mongoose.model("ItemsCommunication", itemsComSchema)

module.exports = ItemsCommunication