const machines = require("../data/machines")
const links = require("../data/links")

exports.network = [
    {
        machines: {
            source: machines.machine01,
            destination: machines.machine02
        },
        link: links.link01
    },
    {
        machines: {
            source: machines.machine02,
            destination: machines.machine03
        },
        link: links.link02
    },
    {
        machines: {
            source: machines.machine03,
            destination: machines.machine01
        },
        link: links.link03
    },
]


