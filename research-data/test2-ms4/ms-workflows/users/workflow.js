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
                    min: 200,
                    max: 300
                }
            }
        }
    ],
    serviceDelay: {
        type: "random",
        min: 800,
        max: 900
    }
}

module.exports = workflow;