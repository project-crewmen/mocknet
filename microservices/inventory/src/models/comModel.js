const mongoose = require("mongoose");

const inventoryComSchema = new mongoose.Schema({
    serviceRequests: [
        {
            dest: { type: String },
            requestDelay: { type: Number, default: 0 }
        }
    ],
    serviceDelay: { type: Number, default: 0 },
})

const InventoryCommunication = mongoose.model("InventoryCommunication", inventoryComSchema)

module.exports = InventoryCommunication