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

    const handleOk = async () => {
        try {
            setIsLoading(true);
            const values = await form.validateFields();

            const postPlaylist = getFunctionApi("playlist", "post");
            const postContent = getFunctionApi("playlist", "postContent");
            const postContentNew = getFunctionApi("content", "post");

            // --- Step 1: Upload konten baru dulu ---
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
                    return; // stop disini
                }
            }

            // --- Step 2: Buat playlist ---
            const newPlaylist = await postPlaylist({
                airport_id: 1,
                name: values.name,
                description: values.description,
            });

            // --- Step 3: Gabungkan konten lama + baru dengan order ---
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
            setModal(false);
        } catch (err) {
            console.error(err);
            setCondition(ALERT_TYPE.FAILED, "Gagal menambahkan playlist");
        } finally {
            setIsLoading(false);
        }
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
            <Form form={form} layout="vertical">
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
        </Modal>
    );
}

export default ModalInsertPlaylist;
