const mongoose = require('mongoose');

const containerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    port_mappings: {
        host_port: { type: Number, required: true },
        container_port: { type: Number, required: true },
    },
    resource_requirements: {
        cpu: { type: Number, required: true },
        memory: { type: String, required: true },
        storage: { type: String, required: true }
    },
    deployed_machine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Machine' // Reference to the Machine model
    }
});

const Container = mongoose.model('Container', containerSchema);

module.exports = Container;
