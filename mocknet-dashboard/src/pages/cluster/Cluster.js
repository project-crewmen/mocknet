import { useState, useEffect } from "react";
import { Card, Button } from "antd";

import DefaultLayout from "../../layouts/DefaultLayout";

import UndirectedGraph from "../../components/graphs/UndirectedGraph";
import MachinesTable from "../../components/data-tables/MachinesTable";

import { getMachineList, getLinkMachinesList } from "../../api/api";

function Cluster() {
  const [startClusterMonitoringClicked, setStartClusterMonitoringClicked] = useState(false);

  const [nodes, setNodes] = useState([
    {
      id: 1,
      label: "machine-01"
    },
    {
      id: 2,
      label: "machine-02"
    },
    {
      id: 3,
      label: "machine-03"
    },
    {
      id: 4,
      label: "machine-04"
    },
    {
      id: 5,
      label: "machine-05"
    },
    {
      id: 6,
      label: "machine-06"
    }
  ])

  const [edges, setEdges] = useState([
    { from: 1, to: 2, label: "0" },
    { from: 2, to: 3, label: "0" },
    { from: 3, to: 4, label: "0" },
    { from: 4, to: 5, label: "0" },
    { from: 5, to: 6, label: "0" },
    { from: 6, to: 1, label: "0" }
  ])

  const [machines, setMachines] = useState([{
    machineName: "machine-01",
    cpuUsage: 304,
    memoryUsage: 25840,
    diskUsage: 13072,
    containerDeployments: ["test"]
  }])

  useEffect(() => {
    if (startClusterMonitoringClicked) {
      const fetchData = async () => {
        try {
          const { machineList } = await getMachineList();

          // Machines table
          const mList = machineList.map((m, index) => ({
            machineName: m.name,
            cpuUsage: 304,
            memoryUsage: 25840,
            diskUsage: 13072,
            containerDeployments: m.container_deployments.length > 0 ? m.container_deployments.map(item => item.name): []
          }));

          console.log(mList);

          setMachines(mList)
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
  }, [startClusterMonitoringClicked]);


  const handleStartClick = () => {
    // Set startClicked to true when the Start button is clicked
    setStartClusterMonitoringClicked(!startClusterMonitoringClicked);
  };

  useEffect(() => {
    // Save the startClicked state to local storage
    localStorage.setItem('startClusterMonitoringClicked', JSON.stringify(startClusterMonitoringClicked));

    const fetchData = async () => {
      try {
        const { linkMachinesList } = await getLinkMachinesList();


        // Construct Cluster Distribution Graph
        const uniqueLabels = [...new Set(linkMachinesList.flatMap(item => [item.machines.source.name, item.machines.destination.name]))];

        const machineNodes = uniqueLabels.map((label, index) => ({ id: index + 1, label }));

        setNodes(machineNodes)

        const processLinks = () => {
          const processedList = linkMachinesList.map(item => ({
            from: machineNodes.find(node => node.label === item.machines.source.name)?.id,
            to: machineNodes.find(node => node.label === item.machines.destination.name)?.id,
            label: `${item.link.name} - [Latency: ${item.link.latency}]`
          }));

          return processedList;
        };

        const procesedLinks = processLinks();

        setEdges([...procesedLinks]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data initially
    fetchData();
  }, [startClusterMonitoringClicked]);

  useEffect(() => {
    // Load the startClicked state from local storage on component mount
    const savedState = JSON.parse(localStorage.getItem('startClusterMonitoringClicked'));
    if (savedState !== null) {
      setStartClusterMonitoringClicked(savedState);
    }
  }, []);

  return (
    <DefaultLayout>
      <div className="mb-3 inline-flex items-center justify-between w-full bg-gradient-to-r from-gray-300 to-gray-300 p-2 border border-gray-300 rounded-lg">
        <div className="text-xl font-normal text-gray-800 pl-3">Cluster Monitoring</div>

        <Button type="primary" size="large" className={startClusterMonitoringClicked ? "bg-red-500" : "bg-blue-500"} onClick={handleStartClick}>
          {startClusterMonitoringClicked ? "Stop Monitoring" : "Start Monitoring"}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-5 pb-3">
        <Card title="Cluster Distribution">
          <UndirectedGraph nodes={nodes} edges={edges} />
        </Card>

        <div className=""><MachinesTable data={machines} /></div>
      </div>
    </DefaultLayout>
  )
}

export default Cluster