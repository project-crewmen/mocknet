import { Bar } from "react-chartjs-2";

function BarChart({ chartData, title = "" }) {
    return (
        <div className="h-[300px] w-full">
            <Bar
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: false,
                            text: title
                        },
                        legend: {
                            display: false
                        }
                    }
                }}
            />
        </div>
    )
}

export default BarChart