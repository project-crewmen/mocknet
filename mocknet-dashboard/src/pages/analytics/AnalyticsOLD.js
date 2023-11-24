import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState, useEffect } from "react";
import { Data } from "../../data/Data";
import BarChart from "../../components/charts/BarChart";
import UndirectedGraph from "../../components/graphs/UndirectedGraph";
import CommunicationTable from "../../components/data-tables/CommunicationTable";

import { Card } from "antd";
import DefaultLayout from "../../layouts/DefaultLayout";

import { getStats } from "../../api/api";

Chart.register(CategoryScale);

function Analytics() {
  const [nodes, setNodes] = useState([
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
    }
  ])
  const [edges, setEdges] = useState([
    { from: 1, to: 2, label: "0" },
    { from: 2, to: 1, label: "0" },
    { from: 3, to: 2, label: "0" },
    { from: 3, to: 1, label: "0" }
  ])

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
  });

  const [dataExchangedChartData, setDataExchangedChartData] = useState({
    labels: Data.map((data) => data.connection),

    datasets: [
      {
        label: "Amount of Data exchanged",
        data: Data.map((data) => data.messagesPassed),
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });

  const [comAffinitiesChartData, setComAffinitiesChartData] = useState({
    labels: Data.map((data) => data.connection),

    datasets: [
      {
        label: "Communication Affinities",
        data: Data.map((data) => data.messagesPassed),
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getStats();

        setNodes([...data.nodes])

        setEdges(data.edges.map(item => {
          return {
            from: item.from, to: item.to, label: `${item.affinity}`
          }
        }))

        setMessagesPassedChartData({
          ...messagesPassedChartData,
          labels: data.messagesPassedEdges.map(
            (item) => item.node1 + " - " + item.node2
          ),
          datasets: [
            {
              label: "Amount of Messages passed",
              data: data.messagesPassedEdges.map((item) => item.weight),
              borderColor: "black",
              borderWidth: 1,
            },
          ],
        });

        setDataExchangedChartData({
          ...messagesPassedChartData,
          labels: data.dataExchangedEdges.map(
            (item) => item.node1 + " - " + item.node2
          ),
          datasets: [
            {
              label: "Amount of Data exchanged",
              data: data.dataExchangedEdges.map((item) => item.weight),
              borderColor: "black",
              borderWidth: 1,
            },
          ],
        });

        setComAffinitiesChartData({
          ...messagesPassedChartData,
          labels: data.communicationAffinities.map(
            (item) => item.node1 + " - " + item.node2
          ),
          datasets: [
            {
              label: "Communication Affinities",
              data: data.communicationAffinities.map((item) => item.affinity),
              borderColor: "black",
              borderWidth: 1,
            },
          ],
        });
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
  }, []);

  return (
    <DefaultLayout>
      <div className="grid grid-cols-3 gap-5 pb-3">
        <Card title="Amount of messages passed">
          <BarChart chartData={messagesPassedChartData} />
        </Card>

        <Card title="Amount of data exchanged">
          <BarChart chartData={dataExchangedChartData} />
        </Card>

        <Card title="Communication Affinities">
          <BarChart chartData={comAffinitiesChartData} />
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-5 pb-3">
        <Card title="Microservice Distribution">
          <UndirectedGraph nodes={nodes} edges={edges} />
        </Card>

        {/* <div className="">
          <CommunicationTable data={edges} />
        </div> */}
      </div>

    </DefaultLayout>
  );
}

export default Analytics;
