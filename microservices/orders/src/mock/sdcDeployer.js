const axios = require("axios");

exports.sdcDeploy = async (req, res) => {
    const deloyMachine = process.env.SDC_MACHINE_NAME

    const containerInfo = {
        name: process.env.SDC_CONTAINER_NAME,
        image: `mocknet/${process.env.SDC_CONTAINER_NAME}`,
        port_mappings: {
            host_port: process.env.PORT,
            container_port: process.env.PORT
        },
        resource_requirements: {
            cpu: process.env.SDC_CONTAINER_CPU,
            memory: process.env.SDC_CONTAINER_MEMORY,
            storage: process.env.SDC_CONTAINER_STORAGE
        }
    }

    try {
        const serviceResponse = await axios.post(`http://localhost:2222/sdc/machine/${deloyMachine}/container/start`,
            containerInfo,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

        if (serviceResponse.status === 200) {
            console.log("✅ Container successfully deployed");

            return serviceResponse
        } else {
            console.log("❌ Container deployment failed");

            return null
        }
    } catch (error) {
        console.error(`[Deployment] Error sending request: ${error.message}`);

        return null
    }
}
