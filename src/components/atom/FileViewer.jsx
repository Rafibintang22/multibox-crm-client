import { Card, Input, Space, Row, Col, Empty } from "antd";

function FileViewer({ dataSource = [] }) {
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
                            <Col xs={24} sm={12} md={8} lg={6} key={file.id}>
                                {file.type === "image" ? (
                                    <img
                                        src={file.url}
                                        alt={file.name}
                                        style={{
                                            width: "100%",
                                            borderRadius: 8,
                                            objectFit: "cover",
                                        }}
                                    />
                                ) : file.type === "video" ? (
                                    <video
                                        controls
                                        style={{ width: "100%", borderRadius: 8 }}
                                        src={file.url}
                                    />
                                ) : (
                                    <p>Unsupported file type</p>
                                )}
                                <p style={{ textAlign: "center", marginTop: 8 }}>{file.name}</p>
                            </Col>
                        ))}
                    </Row>
                )}
            </Card>
        </>
    );
}

export default FileViewer;
