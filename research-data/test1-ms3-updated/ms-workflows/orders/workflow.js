const apis = require("../config/apis")

const workflow = {
    configurations: {
        serviceName: "orders"
    },
    serviceList: [
        {
            apiInfo: apis.items,
            requests: {
                type: "random",
                min: 1,
                max: 10,
                requestDelay: {
                    type: "random",
                    min: 850,
                    max: 1000
                }
            }
        }
    ],
    serviceDelay: {
        type: "random",
        min: 900,
        max: 1200
    }
}

module.exports = workflow;