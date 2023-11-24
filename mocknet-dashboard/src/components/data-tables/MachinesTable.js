import { Table, Tag } from "antd";


const dataSource = [
    {
        "machineName": "machine-01",
        "cpuUsage": 304,
        "memoryUsage": 25840,
        "diskUsage": 13072,
        "containerDeployments": ["test"]
    },
];

const columns = [
    {
        title: 'Machine',
        dataIndex: 'machineName',
        key: 'machineName',
    },
    {
        title: 'CPU Usage',
        dataIndex: 'cpuUsage',
        key: 'cpuUsage',
    },
    {
        title: 'Memory Usage',
        dataIndex: 'memoryUsage',
        key: 'memoryUsage',
    },
    {
        title: 'Disk Usage',
        dataIndex: 'diskUsage',
        key: 'diskUsage',
    },
    {
        title: 'Container Deployments',
        dataIndex: 'containerDeployments',
        key: 'containerDeployments',
        render: (_, { containerDeployments }) => (
            <>
                {containerDeployments.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
];

function MachinesTable({ data }) {
    return (
        <Table dataSource={data ? data : dataSource} columns={columns} />
    )
}

export default MachinesTable