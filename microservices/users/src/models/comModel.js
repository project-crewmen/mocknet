const mongoose = require("mongoose");

const usersComSchema = new mongoose.Schema({
    serviceRequests: [
        {
            dest: { type: String },
            requestDelay: { type: Number, default: 0 }
        }
    ],
    serviceDelay: { type: Number, default: 0 },
})

const UsersCommunication = mongoose.model("UsersCommunication", usersComSchema)

module.exports = UsersCommunication