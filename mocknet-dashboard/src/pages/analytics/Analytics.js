import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { Data } from "../../data/Data";
import BarChart from "../../components/charts/BarChart";

import { Card } from 'antd';
import DefaultLayout from "../../layouts/DefaultLayout";

Chart.register(CategoryScale);

function Analytics() {
    const [chartData, setChartData] = useState({
        labels: Data.map((data) => data.connection),

        datasets: [
            {
                label: "Amount of Messages passed",
                data: Data.map((data) => data.messagesPassed),
                borderColor: "black",
                borderWidth: 1
            }
        ]
    });

    return (
        <DefaultLayout>
            <Card title="Microservice Affinity - Amount of messages passed" className="w-[800px]"><BarChart chartData={chartData} /></Card>
        </DefaultLayout>
    )
}

export default Analytics