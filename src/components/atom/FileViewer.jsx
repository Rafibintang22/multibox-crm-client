import { Card, Input, Space, Row, Col, Empty, Modal } from "antd";
import { useEffect, useState } from "react";

function FileViewer({ dataSource = [] }) {
    const [thumbnails, setThumbnails] = useState({});
    const [preview, setPreview] = useState(null);

    // Generate thumbnail dari video (detik ke-2)
    useEffect(() => {
        dataSource.forEach((file) => {
            if (file.type === "video" && !thumbnails[file.content_id]) {
                const video = document.createElement("video");
                video.src = file.url;
                video.crossOrigin = "anonymous"; // supaya bisa drawImage di canvas
                video.currentTime = 2;

                video.addEventListener("loadeddata", () => {
                    const canvas = document.createElement("canvas");
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    setThumbnails((prev) => ({
                        ...prev,
                        [file.content_id]: canvas.toDataURL("image/png"),
                    }));
                });
            }
        });
    }, [dataSource, thumbnails]);

    return (
        <>
            {/* Search */}
            <Card className="mb-4">
                <Space>
                    <Input.Search placeholder="Cari file..." allowClear style={{ width: 300 }} />
                </Space>
            </Card>

            <Card>
                {dataSource.length === 0 ? (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                ) : (
                    <Row gutter={[16, 16]}>
                        {dataSource.map((file) => (
                            <Col xs={24} sm={12} md={8} lg={6} key={file.content_id}>
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
                                    <img
                                        src={thumbnails[file.content_id]}
                                        alt={file.title}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                    {/* Icon Play */}
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
                                </div>
                                <p style={{ textAlign: "center", marginTop: 8 }}>{file.title}</p>
                            </Col>
                        ))}
                    </Row>
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
                destroyOnClose
            >
                {preview && (
                    <video
                        key={preview?.url}
                        src={preview?.url}
                        style={{ width: "100%", borderRadius: 8 }}
                        controls
                        autoPlay
                    />
                )}
            </Modal>
        </>
    );
}

export default FileViewer;
