import { useState, useEffect } from "react";
import { Card, Button } from "antd";

import DefaultLayout from "../../layouts/DefaultLayout";

import UndirectedGraph from "../../components/graphs/UndirectedGraph";
import MachinesTable from "../../components/data-tables/MachinesTable";
import LinksTable from "../../components/data-tables/LinksTable";

import { getMachineList, getLinkList, getLinkMachinesList } from "../../api/api";

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
    "machineName": "machine-01",
    "cpuUsage": { cpu: 304, cpuAllocated: 304 },
    "memoryUsage": { memory: 304, memoryAllocated: 304 },
    "diskUsage": { disk: 304, diskAllocated: 304 },
    "containerDeployments": ["test"]
  },])

  const [links, setLinks] = useState([{
    "name": "link-01",
    "type": "Fiber Optic",
    "bandwidth": "10 Gbps",
    "latency": "2 ms",
    "jitter": "0.5 ms",
    "packet_loss": "0.05%",
    "reliability": "99.99%",
    "duplex_mode": "Full",
    "physical_medium": "Fiber Optic",
    "distance": "50 meters",
    "protocol": "UDP/IP",
  },])

  const handleStartClick = () => {
    // Set startClicked to true when the Start button is clicked
    setStartClusterMonitoringClicked(!startClusterMonitoringClicked);

    // Save the startClicked state to local storage
    localStorage.setItem('startClusterMonitoringClicked', JSON.stringify(!startClusterMonitoringClicked));
  };

  useEffect(() => {
    const fetchMachinesData = async () => {
      try {
        const { machineList } = await getMachineList();

        // Machines table
        const mList = machineList.map((m, index) => ({
          machineName: m.name,
          cpuUsage: { cpu: m.runtime_stack.cpu, cpuAllocated: m.runtime_stack.cpu_allocated },
          memoryUsage: { memory: m.runtime_stack.memory, memoryAllocated: m.runtime_stack.memory_allocated },
          diskUsage: { disk: m.runtime_stack.storage, diskAllocated: m.runtime_stack.storage_allocated },
          containerDeployments: m.container_deployments.length > 0 ? m.container_deployments.map(item => item.name) : []
        }));

        setMachines(mList)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchLinksData = async () => {
      try {
        const { linkList } = await getLinkList();

        // Machines table
        const lList = linkList.map((l, index) => ({
          name: l.name,
          type: l.type,
          bandwidth: l.bandwidth,
          latency: l.latency,
          jitter: l.jitter,
          packet_loss: l.packet_loss,
          reliability: l.reliability,
          duplex_mode: l.duplex_mode,
          physical_medium: l.physical_medium,
          distance: l.distance,
          protocol: l.protocol,
        }));

        setLinks(lList)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

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
    fetchMachinesData();
    fetchLinksData()
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

        <div>
          <div className="text-lg font-semibold text-gray-700 leading-10 px-1">Machines</div>
          <MachinesTable data={machines} />
        </div>
      </div>


      <div className="py-3">
          <div className="text-lg font-semibold text-gray-700 leading-10 px-1">Links</div>
          <LinksTable data={links} />
        </div>
    </DefaultLayout>
  )
}

export default Cluster