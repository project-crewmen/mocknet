import { Table, Tag } from "antd";

import { convertBytesToSize } from "../../utils/convertor";


const dataSource = [
    {
        "machineName": "machine-01",
        "cpuUsage": { cpu: 304, cpuAllocated: 304 },
        "memoryUsage": { memory: 304, memoryAllocated: 304 },
        "diskUsage": { disk: 304, diskAllocated: 304 },
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
        render: (_, { cpuUsage }) => {
            return `${cpuUsage.cpuAllocated} / ${cpuUsage.cpu}`
        },
    },
    {
        title: 'Memory Usage',
        dataIndex: 'memoryUsage',
        key: 'memoryUsage',
        render: (_, { memoryUsage }) => {
            return `${convertBytesToSize(memoryUsage.memoryAllocated)} / ${convertBytesToSize(memoryUsage.memory)}`
        },
    },
    {
        title: 'Disk Usage',
        dataIndex: 'diskUsage',
        key: 'diskUsage',
        render: (_, { diskUsage }) => {
            return `${convertBytesToSize(diskUsage.diskAllocated)} / ${convertBytesToSize(diskUsage.disk)}`
        },
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