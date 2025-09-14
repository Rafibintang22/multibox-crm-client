import { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useModal, getFunctionApi, useAlert } from "../../constants";
import { MODAL_TYPE } from "../../constants/modalStore";

function ModalInsertPlaylist({ onSuccess }) {
    const { isModalOpen, setModal } = useModal();
    const { setCondition, setIsLoading } = useAlert();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [dataContent, setDataContent] = useState([]);

    useEffect(() => {
        if (isModalOpen === "insert_playlist") {
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
            setCondition("Failed", `Gagal Mendapatkan Data Content`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOk = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();

            // --- Ambil API function ---
            const postPlaylist = getFunctionApi("playlist", "post");
            const postContent = getFunctionApi("playlist", "postContent");

            // --- Step 1: Buat playlist baru ---
            const newPlaylist = await postPlaylist({
                airport_id: 1,
                name: values.name,
                description: values.description,
            });

            // --- Step 2: Tambahkan konten ke playlist ---
            if (values.contentIds?.length) {
                const contents = values.contentIds.map((id, index) => ({
                    content_id: id,
                    order: index + 1,
                }));

                await postContent({
                    playlist_id: newPlaylist.playlist_id, // asumsi API balikin id playlist
                    contents,
                });
            }

            // --- Success flow ---
            onSuccess?.();
            form.resetFields();
            setModal(false);
        } catch (err) {
            console.error("Gagal simpan playlist:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Tambah Playlist"
            open={isModalOpen === MODAL_TYPE.INSERT_PL}
            onCancel={() => setModal(false)}
            onOk={handleOk}
            confirmLoading={loading}
            destroyOnHidden
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
