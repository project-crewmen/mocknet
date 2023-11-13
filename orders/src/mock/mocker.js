const axios = require("axios");

const { getRandomInt, sleep } = require("../utils/utils");
const Network = require("../models/networkModel")

const workflow = require("../data/workflow.json")

exports.mock = async (req, res) => {
    let totalMessagePassed = 0
    let totalDataEchanged = 0

    while (true) {
        for (const service of workflow.serviceList) {
            console.log(`service: ${service.service}`);

            var network = null
            const prevNetwork = await Network.findOne({ sender: workflow.configurations.serviceName, receiver: service.service })

            if (prevNetwork !== null) {
                network = prevNetwork
            }
            else {
                network = await Network.create({
                    sender: workflow.configurations.serviceName,
                    receiver: service.service,
                    messagesPassed: 0,
                    dataExchanged: 0,
                })
            }

            for (const api of service.apiList) {
                // find API by ENV
                var API = ""
                for (const apiItem of api.api) {
                    if (apiItem.env === workflow.configurations.env) {
                        API = apiItem.api
                    }
                }

                if (API == "") {
                    console.log("No valid API found for the Environment");
                    return
                }

                console.log(`API: ${API}`);

                const numberOfRequests = getRandomInt(api.requests.min, api.requests.max); // Send a random number of requests between 1 and 10

                for (let index = 0; index < numberOfRequests; index++) {
                    try {
                        // Call the API
                        const serviceResponse = await axios.get(API);

                        // Measure payload size
                        const payloadSize = JSON.stringify(serviceResponse.data).length;

                        console.log(`Response received with payload size ${payloadSize} bytes`);

                        totalMessagePassed = totalMessagePassed + 1
                        totalDataEchanged = totalDataEchanged + payloadSize

                        console.log(`totalMessagePassed: ${totalMessagePassed}, totalDataEchanged: ${totalDataEchanged}`);

                        // Update Database Record
                        const updatedNetwork = await Network.findOneAndUpdate({
                            sender: workflow.configurations.serviceName,
                            receiver: service.service,
                        }, {
                            messagesPassed: totalMessagePassed,
                            dataExchanged: totalDataEchanged
                        })
                    } catch (error) {
                        console.error(`Error sending request: ${error.message}`);
                    }

                    // Delay
                    const localDelay = getRandomInt(api.requests.requestDelay.min, api.requests.requestDelay.max); // Random delay between 0.5 and 1 seconds
                    await sleep(localDelay);
                }
            }
        }

        // Delay
        const globalDelay = getRandomInt(workflow.serviceDelay.min, workflow.serviceDelay.max); // Random delay between 1 and 5 seconds
        console.log(`------- wait ${globalDelay}ms until next round of mock requests ---`)
        await sleep(globalDelay);
    }
};

