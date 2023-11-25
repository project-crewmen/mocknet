const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    bandwidth: { type: String, required: true },
    latency: { type: String, required: true },
    jitter: { type: String, required: true },
    packet_loss: { type: String, required: true },
    reliability: { type: String, required: true },
    duplex_mode: { type: String, required: true },
    physical_medium: { type: String, required: true },
    distance: { type: String, required: true },
    protocol: { type: String, required: true },
});

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;
