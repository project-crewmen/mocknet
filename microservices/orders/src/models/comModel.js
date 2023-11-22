const mongoose = require("mongoose");

const ordersComSchema = new mongoose.Schema({
    serviceRequests: [
        {
            dest: { type: String },
            requestDelay: { type: Number, default: 0 }
        }
    ],
    serviceDelay: { type: Number, default: 0 },
})

const OrdersCommunication = mongoose.model("OrdersCommunication", ordersComSchema)

module.exports = OrdersCommunication