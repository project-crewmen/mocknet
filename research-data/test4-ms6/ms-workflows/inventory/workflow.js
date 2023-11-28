const apis = require("../config/apis")

const workflow = {
    configurations: {
        serviceName: "inventory"
    },
    serviceList: [
        {
            apiInfo: apis.email,
            requests: {
                type: "random",
                min: 1,
                max: 10,
                requestDelay: {
                    type: "random",
                    min: 600,
                    max: 800
                }
            }
        }
    ],
    serviceDelay: {
        type: "random",
        min: 800,
        max: 1000
    }
}

module.exports = workflow;