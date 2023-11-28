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
                    min: 400,
                    max: 500
                }
            }
        }
    ],
    serviceDelay: {
        type: "random",
        min: 700,
        max: 900
    }
}

module.exports = workflow;