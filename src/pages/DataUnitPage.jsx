import { Table, Input, Space, Tag, Card, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import { GlobalLayout } from "../components/layout";
import { HeadMain } from "../components/atom";

function DataUnitPage() {
    const [searchText, setSearchText] = useState("");

    // Dummy data unit box (bisa diganti API)
    const dataSource = [
        {
            key: "1",
            kode: "BOX-001",
            lokasi: "Tower A - Lantai 1",
            status: "Online",
            terakhirUpdate: "2025-09-08 10:00",
        },
        {
            key: "2",
            kode: "BOX-002",
            lokasi: "Tower B - Lantai 3",
            status: "Offline",
            terakhirUpdate: "2025-09-07 15:45",
        },
        {
            key: "3",
            kode: "BOX-003",
            lokasi: "Lobby Utama",
            status: "Online",
            terakhirUpdate: "2025-09-06 08:30",
        },
    ];

    const filteredData = dataSource.filter(
        (item) =>
            item.kode.toLowerCase().includes(searchText.toLowerCase()) ||
            item.lokasi.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
        {
            title: "Kode Box",
            dataIndex: "kode",
            key: "kode",
        },
        {
            title: "Lokasi",
            dataIndex: "lokasi",
            key: "lokasi",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) =>
                status === "Online" ? (
                    <Tag color="green">Online</Tag>
                ) : (
                    <Tag color="red">Offline</Tag>
                ),
        },
        {
            title: "Terakhir Update",
            dataIndex: "terakhirUpdate",
            key: "terakhirUpdate",
        },
        {
            title: "Aksi",
            key: "aksi",
            render: (_, record) => (
                <Space>
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        // onClick={() => handleEdit(record)}
                    >
                        Edit
                    </Button>
                    <Button
                        type="link"
                        danger
                        icon={<DeleteOutlined />}
                        // onClick={() => handleDelete(record)}
                    >
                        Hapus
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <GlobalLayout>
            <HeadMain title={"Data Unit Box"} isBtnAdd="Tambah data unit" />

            <Card className="mb-4">
                <Space>
                    <Input.Search
                        placeholder="Cari kode atau lokasi box..."
                        allowClear
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 300 }}
                    />
                </Space>
            </Card>

            <Card>
                <Table
                    dataSource={filteredData}
                    columns={columns}
                    pagination={{ pageSize: 5 }}
                    rowKey="key"
                    scroll={{ x: "max-content" }}
                />
            </Card>
        </GlobalLayout>
    );
}

export default DataUnitPage;
