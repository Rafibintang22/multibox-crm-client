import { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Upload, Select, Table } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useModal, getFunctionApi, useAlert } from "../../constants";
import { MODAL_TYPE } from "../../constants/modalStore";
import { ALERT_TYPE } from "../../constants/alertStore";

function ModalInsertPlaylist({ onSuccess }) {
    const { isModalOpen, setModal } = useModal();
    const { setCondition, setIsLoading, isLoading } = useAlert();
    const [form] = Form.useForm();
    const [dataContent, setDataContent] = useState([]);
    const [orderedContents, setOrderedContents] = useState([]);

    useEffect(() => {
        if (isModalOpen === MODAL_TYPE.INSERT_PL) {
            form.resetFields();
            setOrderedContents([]);
            getContentData();
        }
    }, [isModalOpen]);

    const getContentData = async () => {
        setIsLoading(true);
        try {
            const getContent = getFunctionApi("content", "get");
            const data = await getContent();
            setDataContent(data);
        } catch (error) {
            console.error(error);
            setCondition(ALERT_TYPE.FAILED, `Gagal Mendapatkan Data Content`);
        } finally {
            setIsLoading(false);
        }
    };

    // --- Handle OK / submit ---
    const handleOk = async () => {
        try {
            setIsLoading(true);
            const values = await form.validateFields();

            const postPlaylist = getFunctionApi("playlist", "post");
            const postContent = getFunctionApi("playlist", "postContent");
            const postContentNew = getFunctionApi("content", "post");

            // Upload konten baru
            let newContentIds = [];
            if (values.newContents?.length) {
                try {
                    const uploadResults = await Promise.all(
                        values.newContents.map(async (file) => {
                            const formData = new FormData();
                            formData.append("file", file.originFileObj);
                            return await postContentNew(formData);
                        })
                    );
                    newContentIds = uploadResults.map((c) => c.content_id);
                } catch (uploadErr) {
                    console.error(uploadErr);
                    setCondition(
                        ALERT_TYPE.FAILED,
                        "Upload konten baru gagal, playlist tidak dibuat"
                    );
                    return;
                }
            }

            // Buat playlist
            const newPlaylist = await postPlaylist({
                airport_id: 1,
                name: values.name,
                description: values.description,
            });

            // Gabungkan konten lama + baru
            const allContentIds = [...(values.contentIds || []), ...newContentIds];

            if (allContentIds.length) {
                const contents = allContentIds.map((id, index) => ({
                    content_id: id,
                    order: index + 1,
                }));

                await postContent({
                    playlist_id: newPlaylist.playlist_id,
                    contents,
                });
            }

            setCondition(ALERT_TYPE.SUCCESS, "Playlist berhasil ditambahkan");
            onSuccess?.();
            form.resetFields();
            setOrderedContents([]);
            setModal(false);
        } catch (err) {
            console.error(err);
            setCondition(ALERT_TYPE.FAILED, "Gagal menambahkan playlist");
        } finally {
            setIsLoading(false);
        }
    };

    // --- Update orderedContents realtime ---
    const handleFormChange = () => {
        const values = form.getFieldsValue(true); // ambil semua field
        const oldContents = (values.contentIds || []).map((id) => {
            const c = dataContent.find((d) => d.content_id === id);
            return { type: "old", id, title: c?.title || `Content ${id}` };
        });

        const newContents = (values.newContents || []).map((f) => ({
            type: "new",
            id: f.uid,
            title: f.name,
            file: f.originFileObj,
        }));

        setOrderedContents([...oldContents, ...newContents]);
    };

    return (
        <Modal
            title="Tambah Playlist"
            open={isModalOpen === MODAL_TYPE.INSERT_PL}
            onCancel={() => setModal(false)}
            onOk={handleOk}
            confirmLoading={isLoading}
            afterClose={() => form.resetFields()}
            width={700}
            centered
        >
            <Form
                form={form}
                layout="vertical"
                onValuesChange={handleFormChange} // realtime update
            >
                <Form.Item
                    name="name"
                    label="Nama Playlist"
                    rules={[{ required: true, message: "Nama wajib diisi" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Deskripsi">
                    <Input.TextArea rows={3} />
                </Form.Item>

                {/* Pilih konten lama */}
                <Form.Item name="contentIds" label="Pilih Konten yang Sudah Ada">
                    <Select
                        mode="multiple"
                        allowClear
                        placeholder="Pilih konten dari server"
                        options={dataContent.map((c) => ({
                            value: c.content_id,
                            label: c.title,
                        }))}
                    />
                </Form.Item>

                {/* Upload konten baru */}
                <Form.Item
                    name="newContents"
                    label="Upload Konten Baru (gambar/video)"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e && e.fileList}
                >
                    <Upload beforeUpload={() => false} multiple listType="picture">
                        <Button icon={<UploadOutlined />}>Pilih File</Button>
                    </Upload>
                </Form.Item>
            </Form>

            {/* Preview order */}
            {orderedContents.length > 0 && (
                <div className="mt-4">
                    <h4>Urutan Konten</h4>
                    <Table
                        dataSource={orderedContents.map((c, i) => ({
                            key: c.id,
                            no: i + 1,
                            title: c.title,
                            type: c.type === "old" ? "Konten Lama" : "Konten Baru",
                        }))}
                        columns={[
                            { title: "No", dataIndex: "no", width: 60 },
                            { title: "Judul", dataIndex: "title" },
                            { title: "Jenis", dataIndex: "type" },
                        ]}
                        pagination={false}
                        size="small"
                    />
                </div>
            )}
        </Modal>
    );
}

export default ModalInsertPlaylist;
