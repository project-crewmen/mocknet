const apis = require("../config/apis")

const workflow = {
    configurations: {
        serviceName: "items"
    },
    serviceList: [
        {
            apiInfo: apis.users,
            requests: {
                type: "random",
                min: 1,
                max: 10,
                requestDelay: {
                    type: "random",
                    min: 800,
                    max: 1100
                }
            }
        }
    ],
    serviceDelay: {
        type: "random",
        min: 700,
        max: 1500
    }
}

module.exports = workflow;