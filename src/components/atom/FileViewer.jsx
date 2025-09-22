import {
    Card,
    Input,
    Space,
    Row,
    Col,
    Empty,
    Modal,
    Segmented,
    Dropdown,
    Button,
    Checkbox,
    message,
    List,
} from "antd";
import { AppstoreOutlined, BarsOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

function FileViewer({ dataSource = [], onDelete }) {
    const [thumbnails, setThumbnails] = useState({});
    const [preview, setPreview] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [viewMode, setViewMode] = useState("List");
    const [isManage, setIsManage] = useState(false);

    // Generate thumbnail dari video (detik ke-2)
    // useEffect(() => {
    //     dataSource.forEach((file) => {
    //         if (file.type === "video" && !thumbnails[file.content_id]) {
    //             const video = document.createElement("video");
    //             video.src = file.url;
    //             video.crossOrigin = "anonymous";
    //             video.currentTime = 2;

    //             video.addEventListener("loadeddata", () => {
    //                 const canvas = document.createElement("canvas");
    //                 canvas.width = video.videoWidth;
    //                 canvas.height = video.videoHeight;
    //                 const ctx = canvas.getContext("2d");
    //                 ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    //                 setThumbnails((prev) => ({
    //                     ...prev,
    //                     [file.content_id]: canvas.toDataURL("image/png"),
    //                 }));
    //             });
    //         }
    //     });
    // }, [dataSource, thumbnails]);

    const toggleSelect = (fileId, checked) => {
        setSelectedFiles((prev) =>
            checked ? [...prev, fileId] : prev.filter((id) => id !== fileId)
        );
    };

    const handleDelete = () => {
        if (selectedFiles.length === 0) {
            message.warning("Tidak ada file yang dipilih");
            return;
        }

        Modal.confirm({
            title: "Konfirmasi Hapus",
            content: `Apakah yakin ingin menghapus ${selectedFiles.length} file?`,
            okText: "Ya",
            cancelText: "Batal",
            onOk: () => {
                if (onDelete) {
                    onDelete(selectedFiles);
                    console.log(selectedFiles);
                }
                message.success("File berhasil dihapus");
                setSelectedFiles([]);
            },
        });
    };

    return (
        <>
            {/* Search */}
            <Card className="mb-4">
                <Space>
                    <Input.Search placeholder="Cari konten..." allowClear style={{ width: 300 }} />
                </Space>
            </Card>

            <Card>
                <div className="header-card-content mb-5 flex justify-between items-center">
                    <Segmented
                        options={[
                            { value: "List", icon: <BarsOutlined /> },
                            { value: "Kanban", icon: <AppstoreOutlined /> },
                        ]}
                        value={viewMode}
                        onChange={setViewMode}
                    />

                    <div>
                        <Button
                            size="small"
                            type="text"
                            onClick={() => {
                                setIsManage(!isManage);
                                setSelectedFiles([]);
                            }}
                        >
                            {isManage ? "Selesai" : "Atur Konten"}
                        </Button>
                        {/* Menu Manage */}
                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        key: "delete",
                                        label: "Hapus konten dipilih",
                                        icon: <DeleteOutlined />,
                                        onClick: handleDelete,
                                    },
                                ],
                            }}
                            placement="bottomRight"
                        >
                            <Button type="text" icon={<MoreOutlined />} />
                        </Dropdown>
                    </div>
                </div>

                {!dataSource || dataSource?.length === 0 ? (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                ) : viewMode === "Kanban" ? (
                    // ==== KANBAN VIEW ====
                    <Row gutter={[16, 16]}>
                        {dataSource?.map((file) => (
                            <Col xs={24} sm={12} md={8} lg={6} key={file.content_id}>
                                <div style={{ position: "relative" }}>
                                    {isManage && (
                                        <Checkbox
                                            checked={selectedFiles.includes(file.content_id)}
                                            onClick={(e) => e.stopPropagation()}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                toggleSelect(file.content_id, e.target.checked);
                                            }}
                                            style={{
                                                position: "absolute",
                                                top: 8,
                                                left: 8,
                                                zIndex: 2,
                                                background: "rgba(255,255,255,0.8)",
                                                borderRadius: 4,
                                                padding: 2,
                                            }}
                                        />
                                    )}
                                    <div
                                        style={{
                                            width: "100%",
                                            aspectRatio: "16/9",
                                            borderRadius: 8,
                                            overflow: "hidden",
                                            backgroundColor: "#000",
                                            position: "relative",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => setPreview(file)}
                                    >
                                        {file.type === "video" ? (
                                            <>
                                                <img
                                                    src={thumbnails[file.content_id]}
                                                    alt={file.title}
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover",
                                                    }}
                                                />
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        top: "50%",
                                                        left: "50%",
                                                        transform: "translate(-50%, -50%)",
                                                        fontSize: 40,
                                                        color: "white",
                                                        textShadow: "0 0 10px rgba(0,0,0,0.6)",
                                                    }}
                                                >
                                                    ▶
                                                </div>
                                            </>
                                        ) : (
                                            <img
                                                src={file.url}
                                                alt={file.title}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        )}
                                    </div>
                                    <p style={{ textAlign: "center", marginTop: 8 }}>
                                        {file.title}
                                    </p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    // ==== LIST VIEW ====
                    <List
                        bordered
                        dataSource={dataSource}
                        renderItem={(file) => (
                            <List.Item
                                actions={[
                                    isManage && (
                                        <Checkbox
                                            checked={selectedFiles.includes(file.content_id)}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                toggleSelect(file.content_id, e.target.checked);
                                            }}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    ),
                                ]}
                                onClick={() => setPreview(file)}
                                style={{ cursor: "pointer" }}
                            >
                                {file.title}
                            </List.Item>
                        )}
                    />
                )}
            </Card>

            {/* Modal Video Player */}
            <Modal
                open={!!preview}
                onCancel={() => setPreview(null)}
                footer={null}
                title={preview?.title}
                width={800}
                centered
                destroyOnHidden
            >
                {preview &&
                    (preview.type === "video" ? (
                        <video
                            key={preview?.url}
                            src={preview?.url}
                            style={{ width: "100%", borderRadius: 8 }}
                            controls
                            autoPlay
                        />
                    ) : (
                        <img
                            src={preview?.url}
                            alt={preview?.title}
                            style={{ width: "100%", borderRadius: 8 }}
                        />
                    ))}
            </Modal>
        </>
    );
}

export default FileViewer;
