const mongoose = require('mongoose');

const networkSchema = new mongoose.Schema({
    machines: {
        source: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Machine' // Reference to the Machine model
        },
        destination: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Machine' // Reference to the Machine model
        }
    },
    link: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Link' // Reference to the Link model
    }
});

const Network = mongoose.model('Network', networkSchema);

module.exports = Network;