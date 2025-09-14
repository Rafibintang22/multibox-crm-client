import { Card, Input, Space, Table } from "antd";
import React from "react";

function TableComp({ dataSource, columns }) {
    return (
        <>
            <Card className="mb-4">
                <Space>
                    <Input.Search
                        placeholder="Cari disini..."
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
                    scroll={{ x: "max-content" }}
                />
            </Card>
        </>
    );
}

export default TableComp;
