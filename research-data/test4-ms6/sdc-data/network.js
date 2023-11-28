const machines = require("../data/machines")
const links = require("../data/links")

exports.network = [
    {
        machines: {
            source: machines.machine01,
            destination: machines.machine02
        },
        link: links.link06
    },
    {
        machines: {
            source: machines.machine02,
            destination: machines.machine03
        },
        link: links.link06
    },
    {
        machines: {
            source: machines.machine03,
            destination: machines.machine04
        },
        link: links.link06
    },
    {
        machines: {
            source: machines.machine04,
            destination: machines.machine05
        },
        link: links.link06
    },
    {
        machines: {
            source: machines.machine05,
            destination: machines.machine06
        },
        link: links.link06
    },
    {
        machines: {
            source: machines.machine06,
            destination: machines.machine01
        },
        link: links.link06
    },
    {
        machines: {
            source: machines.machine05,
            destination: machines.machine01
        },
        link: links.link06
    },
]


