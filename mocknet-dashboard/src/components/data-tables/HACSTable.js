import { Table, Tag } from "antd";


const dataSource = [
    {
        "src": "users",
        "dest": "orders",
        "AC_x_y": "0",
    },
];

const columns = [
    {
        title: 'Source',
        dataIndex: 'src',
        key: 'src',
    },
    {
        title: 'Destination',
        dataIndex: 'dest',
        key: 'dest',
    },
    {
        title: 'Affinity Cost',
        dataIndex: 'AC_x_y',
        key: 'AC_x_y',
    },
];

function HACSTable({ data }) {
    return (
        <Table dataSource={data ? data : dataSource} columns={columns} />
    )
}

export default HACSTable