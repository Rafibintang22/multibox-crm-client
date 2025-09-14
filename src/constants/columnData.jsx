import { Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const getColumnsPlaylist = (handleEdit, handleDelete) => [
    {
        title: "Kode",
        dataIndex: "playlist_id",
        key: "playlist_id",
    },
    {
        title: "Nama",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Deskripsi",
        dataIndex: "description",
        key: "description",
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

export { getColumnsPlaylist };
