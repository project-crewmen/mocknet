import { Table } from "antd";

const dataSource = [
    {
        "from": 1,
        "to": 2,
        "edge": "users - orders",
        "messagesPassed": 304,
        "dataExchanged": 25840,
        "affinity": 13072
    },
    {
        "from": 2,
        "to": 1,
        "edge": "orders - users",
        "messagesPassed": 320,
        "dataExchanged": 16320,
        "affinity": 8320
    },
    {
        "from": 3,
        "to": 2,
        "edge": "items - orders",
        "messagesPassed": 398,
        "dataExchanged": 26724,
        "affinity": 13561
    },
    {
        "from": 3,
        "to": 1,
        "edge": "items - users",
        "messagesPassed": 396,
        "dataExchanged": 26554,
        "affinity": 13475
    }
];

const columns = [
    {
        title: 'Edge',
        dataIndex: 'edge',
        key: 'edge',
    },
    {
        title: 'Messages Passed',
        dataIndex: 'messagesPassed',
        key: 'messagesPassed',
    },
    {
        title: 'Data Exchanged',
        dataIndex: 'dataExchanged',
        key: 'dataExchanged',
    },
    {
        title: 'Affinity',
        dataIndex: 'affinity',
        key: 'affinity',
    },
];

function CommunicationTable({data}) {
    return (
        <Table dataSource={data ? data : dataSource} columns={columns} />
    )
}

export default CommunicationTable