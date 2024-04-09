import { Table, Tag } from "antd";


const dataSource = [
    {
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
    },
];

const columns = [
    {
        title: 'Link Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: 'Bandwidth',
        dataIndex: 'bandwidth',
        key: 'bandwidth',
    },
    {
        title: 'Latency',
        dataIndex: 'latency',
        key: 'latency',
    },
    {
        title: 'Jitter',
        dataIndex: 'jitter',
        key: 'jitter',
    },
    {
        title: 'Packet Loss',
        dataIndex: 'packet_loss',
        key: 'packet_loss',
    },
    {
        title: 'Reliability',
        dataIndex: 'reliability',
        key: 'reliability',
    },
    {
        title: 'Duplex Mode',
        dataIndex: 'duplex_mode',
        key: 'duplex_mode',
    },
    {
        title: 'Physical Medium',
        dataIndex: 'physical_medium',
        key: 'physical_medium',
    },
    {
        title: 'Distance',
        dataIndex: 'distance',
        key: 'distance',
    },
    {
        title: 'Protocol',
        dataIndex: 'protocol',
        key: 'protocol',
    },
];

function LinksTable({ data }) {
    return (
        <Table dataSource={data ? data : dataSource} columns={columns} />
    )
}

export default LinksTable