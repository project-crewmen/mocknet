const axios = require("axios");

const { getRandomInt, sleep } = require("../utils/utils");

const Affinity = require("../models/affinityModel")
const Communication = require("../models/comModel")

const workflow = require("../data/workflow")

const apis = require("../config/apis");

exports.mock = async (req, res) => {
    console.log(`Request Mode - ${process.env.REQUEST_MODE}`);

    switch (process.env.REQUEST_MODE) {
        case "workflow":
            followWorkflow()
            break;

        case "reproduce":
            reproduce()
            break;

        case "pause":
            pause()
            break;

        case "clear":
            clear()
            break;

        default:
            pause()
            break;
    }
};

const followWorkflow = async () => {
    let totalMessagePassed = 0
    let totalDataEchanged = 0

    while (true) {
        let serviceRequests = []

        for (const service of workflow.serviceList) {
            var affnity = null
            const prevAffinity = await Affinity.findOne({ src: workflow.configurations.serviceName, dest: service.apiInfo.service })

            if (prevAffinity !== null) {
                affnity = prevAffinity
            }
            else {
                affnity = await Affinity.create({
                    src: workflow.configurations.serviceName,
                    dest: service.apiInfo.service,
                    messagesPassed: 0,
                    dataExchanged: 0,
                })
            }

            // Get the API
            const API = service.apiInfo.apiList.find(a => a.env === process.env.ENV).api

            if (API == "") {
                console.log("No valid API found for the Environment");
                return
            }

            const numberOfRequests = getRandomInt(service.requests.min, service.requests.max); // Send a random number of requests between 1 and 10

            console.log(`| Service: ${service.apiInfo.service} | API: ${API} | # of Requests: ${numberOfRequests} |`);

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
                    const updatedAffinity = await Affinity.findOneAndUpdate({
                        src: workflow.configurations.serviceName,
                        dest: service.apiInfo.service,
                    }, {
                        messagesPassed: totalMessagePassed,
                        dataExchanged: totalDataEchanged
                    })

                    // Delay
                    const localDelay = getRandomInt(service.requests.requestDelay.min, service.requests.requestDelay.max); // Random delay between 0.5 and 1 seconds
                    await sleep(localDelay);

                    // Populate ServiceRequests to push in to DB
                    if (serviceResponse.status === 200) {
                        serviceRequests.push({ dest: service.apiInfo.service, requestDelay: localDelay })
                    }
                } catch (error) {
                    console.error(`Error sending request: ${error.message}`);

                    // Retry delay
                    await sleep(1000);
                }
            }
        }

        // Delay
        const globalDelay = getRandomInt(workflow.serviceDelay.min, workflow.serviceDelay.max); // Random delay between 1 and 5 seconds
        console.log(`------- wait ${globalDelay}ms until next round of mock requests ---`)
        await sleep(globalDelay);

        // Add DB Record
        if (serviceRequests.length > 0) {
            const network = await Communication.create({
                serviceRequests: serviceRequests,
                serviceDelay: globalDelay
            })

            if (network) {
                console.log("✅ Communication DB Record updated successfully");
            } else {
                console.log("❌ Communication DB Record updating failed");
            }
        }
    }
}

const reproduce = async () => {
    let totalMessagePassed = 0
    let totalDataEchanged = 0

    const com_pattern = await Communication.find({})

    for (const com of com_pattern) {
        for (const serviceRequest of com.serviceRequests) {
            const service = apis.apis.find(s => s.service === serviceRequest.dest)
            const API = service.apiList.find(a => a.env === process.env.ENV).api

            var affnity = null
            const prevAffinity = await Affinity.findOne({ src: process.env.SDC_CONTAINER_NAME, dest: service.service })

            if (prevAffinity !== null) {
                affnity = prevAffinity
            }
            else {
                affnity = await Affinity.create({
                    src: process.env.SDC_CONTAINER_NAME,
                    dest: service.service,
                    messagesPassed: 0,
                    dataExchanged: 0,
                })
            }

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
                const updatedAffinity = await Affinity.findOneAndUpdate({
                    src: process.env.SDC_CONTAINER_NAME,
                    dest: service.service,
                }, {
                    messagesPassed: totalMessagePassed,
                    dataExchanged: totalDataEchanged
                })

                // Delay
                const localDelay = serviceRequest.requestDelay;
                await sleep(localDelay);
            } catch (error) {
                console.error(`Error sending request: ${error.message}`);

                // Retry delay
                await sleep(1000);
            }
        }

        // Delay
        const globalDelay = com.serviceDelay
        console.log(`------- wait ${globalDelay}ms until next round of mock requests ---`)
        await sleep(globalDelay);
    }
}

const pause = async () => {
    console.log("⏸ Service is paused");
}

const clear = async () => {
    try {
        // Check if the network instance already exists
        const coms = await Communication.findOne({});

        if (coms) {
            try {
                // If it exists, delete it
                await Communication.deleteMany({});
                console.log("✅ Previous service communications are cleared");
            } catch (error) {
                console.error(`❌ Error clearing previous communications: ${error.message}`);
                throw error;
            }
        }
    } catch (error) {
        console.error(`❌ Error clearing previous affinities: ${error.message}`);
        throw error;
    }
}