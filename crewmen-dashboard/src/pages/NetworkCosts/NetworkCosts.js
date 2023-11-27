import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState, useEffect } from "react";

import BarChart from "../../components/charts/BarChart";
import UndirectedGraph from "../../components/graphs/UndirectedGraph";
import HACSTable from "../../components/data-tables/HACSTable";

import { Card, Button } from "antd";
import DefaultLayout from "../../layouts/DefaultLayout";

import { getAffinityCostListDetailed } from "../../api/api";

import { Data } from "../../data/Data";

Chart.register(CategoryScale);

function NetworkCosts() {
  const [startNCMonitoringClicked, setStartNCMonitoringClicked] = useState(false);
  const [netCost, setNetCost] = useState(0);
  const [avgCost, setAvgCost] = useState(0);
  const [hacs, setHacs] = useState([]);

  const [affinityCostsData, setAffinityCostsData] = useState({
    labels: Data.map((data) => data.connection),

    datasets: [
      {
        label: "Affinity Costs",
        data: Data.map((data) => data.AC_x_y),
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
    if (startNCMonitoringClicked) {
      const fetchData = async () => {
        try {
          const { affinityCostList, netCost, avgCost, hacs } = await getAffinityCostListDetailed();

          setAffinityCostsData({
            ...affinityCostsData,
            labels: affinityCostList.map(
              (item) => item.src + " - " + item.dest
            ),
            datasets: [
              {
                label: "Amount of Messages passed",
                data: affinityCostList.map((item) => item.AC_x_y),
                borderColor: "black",
                borderWidth: 1,
              },
            ],
          });

          setNetCost(netCost)
          setAvgCost(avgCost)
          setHacs(hacs)

          // Microservice communication graph construction
          const uniqueLabels = [...new Set(affinityCostList.flatMap(factor => [factor.src, factor.dest]))];

          const microserviceNodes = uniqueLabels.map((label, index) => ({ id: index + 1, label }));

          setMicroserviceNodes(microserviceNodes)

          const processAffinityFactors = () => {
            const processedList = affinityCostList.map(factor => ({
              from: microserviceNodes.find(node => node.label === factor.src)?.id,
              to: microserviceNodes.find(node => node.label === factor.dest)?.id,
              label: factor.AC_x_y.toFixed(4).toString()
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
  }, [startNCMonitoringClicked]);

  const handleStartClick = () => {
    // Set startClicked to true when the Start button is clicked
    setStartNCMonitoringClicked(!startNCMonitoringClicked);

    // Save the startClicked state to local storage
    localStorage.setItem('startNCMonitoringClicked', JSON.stringify(!startNCMonitoringClicked));
  };

  useEffect(() => {
    // Load the startClicked state from local storage on component mount
    const savedState = JSON.parse(localStorage.getItem('startNCMonitoringClicked'));
    if (savedState !== null) {
      setStartNCMonitoringClicked(savedState);
    }
  }, []);

  return (
    <DefaultLayout>
      <div className="mb-3 inline-flex items-center justify-between w-full bg-gradient-to-r from-gray-300 to-gray-300 p-2 border border-gray-300 rounded-lg">
        <div className="text-xl font-normal text-gray-800 pl-3">Network Costs Monitoring</div>

        <Button type="primary" size="large" className={startNCMonitoringClicked ? "bg-red-500" : "bg-blue-500"} onClick={handleStartClick}>
          {startNCMonitoringClicked ? "Stop Monitoring" : "Start Monitoring"}
        </Button>
      </div>


      <div className="grid grid-cols-3 gap-5 pb-3">
        <Card title="Network Costs">
          <BarChart chartData={affinityCostsData} />
        </Card>

        <Card title="Microservice Distribution with Affinity Costs">
          <UndirectedGraph nodes={microserviceNodes} edges={microserviceEdges} />
        </Card>

        <Card title="Network Cost Specs">
          <div className="inline-flex text-md text-gray-700">
            <div className="font-semibold w-[250px]">Net Cost(NC): </div>
            <div>{netCost}</div>
          </div>

          <div className="inline-flex text-md text-gray-700 pt-3">
            <div className="font-semibold w-[250px]">Average Cost(AvgCost): </div>
            <div>{avgCost}</div>
          </div>

          <div className="pt-3">
            <div className="text-md text-gray-700 font-semibold w-[300px]">High Affinity Costs Set(HACS): </div>
            <HACSTable data={hacs} />
          </div>
        </Card>
      </div>
    </DefaultLayout>
  )
}

export default NetworkCosts