const mongoose = require("mongoose");

const emailComSchema = new mongoose.Schema({
    serviceRequests: [
        {
            dest: { type: String },
            requestDelay: { type: Number, default: 0 }
        }
    ],
    serviceDelay: { type: Number, default: 0 },
})

const EmailCommunication = mongoose.model("EmailCommunication", emailComSchema)

module.exports = EmailCommunication