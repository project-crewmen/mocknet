import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState, useEffect } from "react";
import { Data } from "../../data/Data";
import BarChart from "../../components/charts/BarChart";

import { Card } from "antd";
import DefaultLayout from "../../layouts/DefaultLayout";

import { getStats } from "../../api/api";

Chart.register(CategoryScale);

function Analytics() {
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
      <div className="flex flex-col md:flex-row gap-5">
        <Card title="Amount of messages passed" className="w-[550px]">
          <BarChart chartData={messagesPassedChartData} />
        </Card>

        <Card title="Amount of data exchanged" className="w-[550px]">
          <BarChart chartData={dataExchangedChartData} />
        </Card>

        <Card title="Communication Affinities" className="w-[550px]">
          <BarChart chartData={comAffinitiesChartData} />
        </Card>
      </div>

    </DefaultLayout>
  );
}

export default Analytics;
