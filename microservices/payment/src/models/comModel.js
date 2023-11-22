const mongoose = require("mongoose");

const paymentComSchema = new mongoose.Schema({
    serviceRequests: [
        {
            dest: { type: String },
            requestDelay: { type: Number, default: 0 }
        }
    ],
    serviceDelay: { type: Number, default: 0 },
})

const PaymentCommunication = mongoose.model("PaymentCommunication", paymentComSchema)

module.exports = PaymentCommunication