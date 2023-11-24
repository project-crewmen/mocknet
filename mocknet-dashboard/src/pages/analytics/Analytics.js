import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState, useEffect } from "react";

import BarChart from "../../components/charts/BarChart";
import UndirectedGraph from "../../components/graphs/UndirectedGraph";

import { Card, Button } from "antd";
import DefaultLayout from "../../layouts/DefaultLayout";

import { getAffinityList, getAffinityFactorList } from "../../api/api";

import { Data } from "../../data/Data";

Chart.register(CategoryScale);

function Analytics() {
    const [startMonitoringClicked, setStartMonitoringClicked] = useState(false);

    const [messagesPassedChartData, setMessagesPassedChartData] = useState({
        labels: Data.map((data) => data.connection),

        datasets: [
            {
                label: "Amount of Messages passed",
                data: Data.map((data) => data.messagesPassed),
                borderColor: "black",
                borderWidth: 1,
            },
        ],
    })

    const [dataExchangedChartData, setDataExchangedChartData] = useState({
        labels: Data.map((data) => data.connection),

        datasets: [
            {
                label: "Amount of Messages passed",
                data: Data.map((data) => data.messagesPassed),
                borderColor: "black",
                borderWidth: 1,
            },
        ],
    })

    const [affinityFactorChartData, setAffinityFactorChartData] = useState({
        labels: Data.map((data) => data.connection),

        datasets: [
            {
                label: "Affinity Factors",
                data: Data.map((data) => data.messagesPassed),
                borderColor: "black",
                borderWidth: 1,
            },
        ],
    })

    const [microserviceNodes, setMicroserviceNodes] = useState([
        {
            id: 1,
            label: "users"
        },
        {
            id: 2,
            label: "orders"
        },
        {
            id: 3,
            label: "items"
        },
        {
            id: 4,
            label: "inventory"
        },
        {
            id: 5,
            label: "email"
        },
        {
            id: 6,
            label: "payment"
        }
    ])

    const [microserviceEdges, setMicroserviceEdges] = useState([
        { from: 1, to: 2, label: "0" },
        { from: 2, to: 3, label: "0" },
        { from: 3, to: 4, label: "0" },
        { from: 4, to: 5, label: "0" },
        { from: 5, to: 6, label: "0" },
        { from: 6, to: 1, label: "0" }
    ])

    useEffect(() => {
        if (startMonitoringClicked) {
            const fetchData = async () => {
                try {
                    const { affinityList } = await getAffinityList();
                    const { affinityFactorList } = await getAffinityFactorList();

                    setMessagesPassedChartData({
                        ...messagesPassedChartData,
                        labels: affinityList.map(
                            (item) => item.src + " - " + item.dest
                        ),
                        datasets: [
                            {
                                label: "Amount of Messages passed",
                                data: affinityList.map((item) => item.messagesPassed),
                                borderColor: "black",
                                borderWidth: 1,
                            },
                        ],
                    });

                    setDataExchangedChartData({
                        ...messagesPassedChartData,
                        labels: affinityList.map(
                            (item) => item.src + " - " + item.dest
                        ),
                        datasets: [
                            {
                                label: "Amount of Data exchanged",
                                data: affinityList.map((item) => item.dataExchanged),
                                borderColor: "black",
                                borderWidth: 1,
                            },
                        ],
                    });

                    setAffinityFactorChartData({
                        ...messagesPassedChartData,
                        labels: affinityFactorList.map(
                            (item) => item.src + " - " + item.dest
                        ),
                        datasets: [
                            {
                                label: "Amount of Data exchanged",
                                data: affinityFactorList.map((item) => item.AF_x_y),
                                borderColor: "black",
                                borderWidth: 1,
                            },
                        ],
                    });

                    // Microservice communication graph construction
                    const uniqueLabels = [...new Set(affinityFactorList.flatMap(factor => [factor.src, factor.dest]))];

                    const microserviceNodes = uniqueLabels.map((label, index) => ({ id: index + 1, label }));

                    console.log(microserviceNodes);

                    setMicroserviceNodes(microserviceNodes)

                    const processAffinityFactors = () => {
                        const processedList = affinityFactorList.map(factor => ({
                            from: microserviceNodes.find(node => node.label === factor.src)?.id,
                            to: microserviceNodes.find(node => node.label === factor.dest)?.id,
                            label: factor.AF_x_y.toFixed(3).toString()
                        }));

                        return processedList;
                    };

                    const processedAffinityFactors = processAffinityFactors();

                    setMicroserviceEdges([...processedAffinityFactors]);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };

            // Fetch data initially
            fetchData();

            // Set up an interval to fetch data every, for example, 5 seconds
            const intervalId = setInterval(fetchData, 5000);

            // Cleanup function to clear the interval when the component is unmounted
            return () => clearInterval(intervalId);
        }
    }, [startMonitoringClicked]);

    const handleStartClick = () => {
        // Set startClicked to true when the Start button is clicked
        setStartMonitoringClicked(!startMonitoringClicked);
    };

    useEffect(() => {
        // Save the startClicked state to local storage
        localStorage.setItem('startMonitoringClicked', JSON.stringify(startMonitoringClicked));
    }, [startMonitoringClicked]);

    useEffect(() => {
        // Load the startClicked state from local storage on component mount
        const savedState = JSON.parse(localStorage.getItem('startMonitoringClicked'));
        if (savedState !== null) {
            setStartMonitoringClicked(savedState);
        }
    }, []);

    return (
        <DefaultLayout>
            <div className="mb-3 inline-flex items-center justify-between w-full bg-gradient-to-r from-blue-300 to-gray-300 p-2 border border-gray-300 rounded-lg">
                <div className="text-xl font-normal text-gray-800 pl-3">Microservice Monitoring</div>

                <Button type="primary" size="large" className={startMonitoringClicked ? "bg-red-500" : "bg-blue-500"} onClick={handleStartClick}>
                    {startMonitoringClicked ? "Stop Monitoring" : "Start Monitoring"}
                </Button>
            </div>

            <div className="grid grid-cols-3 gap-5 pb-3">
                <Card title="Amount of messages passed">
                    <BarChart chartData={messagesPassedChartData} />
                </Card>

                <Card title="Amount of data exchanged">
                    <BarChart chartData={dataExchangedChartData} />
                </Card>

                <Card title="Communication Affinity Factors">
                    <BarChart chartData={affinityFactorChartData} />
                </Card>
            </div>

            <div className="grid grid-cols-3 gap-5 pb-3">
                <Card title="Microservice Distribution">
                    <UndirectedGraph nodes={microserviceNodes} edges={microserviceEdges} />
                </Card>
            </div>

        </DefaultLayout>
    )
}

export default Analytics