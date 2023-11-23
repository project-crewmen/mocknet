const mongoose = require('mongoose');

const machineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    operating_system: { type: String, required: true },
    architecture: { type: String, required: true },
    cpu: {
        model: { type: String, required: true },
        cores: { type: Number, required: true },
        threads: { type: Number, required: true },
        clock_speed: { type: String, required: true }
    },
    memory: {
        total: { type: String, required: true },
        type: { type: String, required: true },
        speed: { type: String, required: true }
    },
    storage: {
        type: { type: String, required: true },
        capacity: { type: String, required: true }
    },
    network_interfaces: {
        name: { type: String, required: true },
        ip_address: { type: String, required: true },
        mac_address: { type: String, required: true }
    },
    container_deployments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Container' }]
});

const Machine = mongoose.model('Machine', machineSchema);

module.exports = Machine;
