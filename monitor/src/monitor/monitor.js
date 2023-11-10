const axios = require("axios");

const { sleep } = require("../utils/utils");

exports.monitor = async (req, res) => {
    while (true) {
        try {
            const orderResponse = await axios.get('http://users:8080/stats/orders');

            console.log(`Response from orders: ${JSON.stringify(orderResponse.data)}`);
        } catch (error) {
            console.error(`Error sending request: ${error.message}`);
        }

        try {
            const orderResponse = await axios.get('http://orders:8081/stats/users');

            console.log(`Response from users: ${JSON.stringify(orderResponse.data)}`);
        } catch (error) {
            console.error(`Error sending request: ${error.message}`);
        }


        // Delay
        const globalDelay = 5000; // Random delay between 1 and 5 seconds
        console.log(`--- wait ${globalDelay}ms until next round of monitoring ---`)
        await sleep(globalDelay);
    }
};

