import { Button, Space } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

const getColumnsPlaylist = (handleDetail) => [
    {
        title: "Kode",
        dataIndex: "playlist_id",
        key: "playlist_id",
        width: 50,
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
        width: 120,
        render: (_, record) => (
            <Space>
                <Button
                    type="link"
                    icon={<EyeOutlined />}
                    onClick={() => handleDetail(record)}
                ></Button>
            </Space>
        ),
    },
];

export { getColumnsPlaylist };
