const apis = require("../config/apis")

const workflow = {
    configurations: {
        serviceName: "users"
    },
    serviceList: [
        {
            apiInfo: apis.orders,
            requests: {
                type: "random",
                min: 1,
                max: 10,
                requestDelay: {
                    type: "random",
                    min: 500,
                    max: 800
                }
            }
        }
    ],
    serviceDelay: {
        type: "random",
        min: 1000,
        max: 2000
    }
}

module.exports = workflow;