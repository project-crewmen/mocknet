const axios = require("axios");

const { getRandomInt, sleep } = require("../utils/utils");

exports.mock = async (req, res) => {
    while (true) {
        const numberOfRequests = getRandomInt(1, 10); // Send a random number of requests between 1 and 10

        for (let index = 0; index < numberOfRequests; index++) {
            try {
                const orderResponse = await axios.get('http://users:8080/user');

                // Measure payload size
                const payloadSize = JSON.stringify(orderResponse.data).length;

                console.log(`Response received with payload size ${payloadSize} bytes`);
            } catch (error) {
                console.error(`Error sending request: ${error.message}`);
            }

            // Delay
            const localDelay = getRandomInt(500, 1); // Random delay between 0.5 and 1 seconds
            await sleep(localDelay);
        }


        // Delay
        const globalDelay = getRandomInt(1000, 5000); // Random delay between 1 and 5 seconds
        console.log(`------- wait ${globalDelay}ms until next round of mock requests ---`)
        await sleep(globalDelay);
    }
};

