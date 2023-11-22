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
                    min: 500,
                    max: 1000
                }
            }
        }
    ],
    serviceDelay: {
        type: "random",
        min: 1000,
        max: 5000
    }
}

module.exports = workflow;