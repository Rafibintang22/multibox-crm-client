import { Table, Button, Space, Card, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { GlobalLayout } from "../components/layout";
import { HeadMain } from "../components/atom";

function LokasiPemasanganPage() {
    // Contoh data dummy
    const dataSource = [
        {
            key: "1",
            lokasiID: "LOC-001",
            nama: "Tower A - Lantai 1",
            keterangan: "Dekat lobby utama",
        },
        {
            key: "2",
            lokasiID: "LOC-002",
            nama: "Tower B - Lantai 3",
            keterangan: "Koridor belakang",
        },
    ];

    // Kolom untuk tabel
    const columns = [
        {
            title: "ID Lokasi",
            dataIndex: "lokasiID",
            key: "lokasiID",
        },
        {
            title: "Nama Lokasi",
            dataIndex: "nama",
            key: "nama",
        },
        {
            title: "Keterangan",
            dataIndex: "keterangan",
            key: "keterangan",
        },
        {
            title: "Aksi",
            key: "aksi",
            render: (_, record) => (
                <Space>
                    <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Button
                        type="link"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record)}
                    >
                        Hapus
                    </Button>
                </Space>
            ),
        },
    ];

    // Handler
    const handleAdd = () => {
        console.log("Tambah lokasi baru");
    };

    const handleEdit = (record) => {
        console.log("Edit lokasi:", record);
    };

    const handleDelete = (record) => {
        console.log("Hapus lokasi:", record);
    };

    return (
        <GlobalLayout>
            <HeadMain title="Lokasi Pemasangan" isBtnAdd="Tambah Lokasi" funcBtnAdd={handleAdd} />

            <Card className="mb-4">
                <Space>
                    <Input.Search
                        placeholder="Cari kode atau lokasi box..."
                        allowClear
                        // onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 300 }}
                    />
                </Space>
            </Card>

            <Card>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={{ pageSize: 5 }}
                    rowKey="key"
                    scroll={{ x: "max-content" }}
                />
            </Card>
        </GlobalLayout>
    );
}

export default LokasiPemasanganPage;
