import { Modal, Upload, Progress } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useModal, getFunctionApi, useAlert } from "../../constants";
import { ALERT_TYPE } from "../../constants/alertStore";
import { MODAL_TYPE } from "../../constants/modalStore";
import { useState, useEffect } from "react";

const { Dragger } = Upload;

function ModalInsertContent({ onSuccess }) {
    const { setCondition } = useAlert();
    const { isModalOpen, setModal } = useModal();
    const postContent = getFunctionApi("content", "post");

    const [uploadProgress, setUploadProgress] = useState({}); // { filename: percent }
    const [uploadingCount, setUploadingCount] = useState(0);

    const props = {
        name: "file",
        multiple: true,
        accept: "video/*,image/*",
        customRequest: async ({ file, onSuccess: onUploadSuccess, onError }) => {
            try {
                setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }));
                setUploadingCount((prev) => prev + 1);

                const formData = new FormData();
                formData.append("file", file);

                await postContent(formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                    onUploadProgress: (progressEvent) => {
                        const percent = Math.round(
                            (progressEvent.loaded / progressEvent.total) * 100
                        );
                        setUploadProgress((prev) => ({ ...prev, [file.name]: percent }));
                    },
                });

                setCondition(ALERT_TYPE.SUCCESS, `${file.name} berhasil diupload`);
                setUploadProgress((prev) => ({ ...prev, [file.name]: 100 }));
                if (onUploadSuccess) onUploadSuccess("ok");
                if (onSuccess) onSuccess();
            } catch (err) {
                setCondition(ALERT_TYPE.FAILED, `${file.name} gagal diupload`, err.message);
                if (onError) onError(err);
            } finally {
                setUploadingCount((prev) => prev - 1);
            }
        },
        onDrop(e) {
            console.log("Dropped files", e.dataTransfer.files);
        },
    };

    // Tutup modal otomatis jika semua upload selesai
    useEffect(() => {
        if (uploadingCount === 0 && Object.keys(uploadProgress).length > 0) {
            setModal(false);
            setUploadProgress({});
        }
    }, [uploadingCount, uploadProgress, setModal]);

    // Modal tidak bisa ditutup secara manual saat upload berlangsung
    const canCloseModal = uploadingCount === 0;

    return (
        <Modal
            title="Tambah Konten"
            open={isModalOpen === MODAL_TYPE.INSERT_CT}
            onCancel={() => canCloseModal && setModal(false)}
            footer={null}
            destroyOnHidden
            width={700}
            centered
            maskClosable={false} // tidak bisa klik background untuk tutup
            keyboard={false} // tidak bisa tekan ESC untuk tutup
        >
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file ke area ini untuk upload</p>
                <p className="ant-upload-hint">
                    Bisa upload multiple file (gambar/video). Pastikan format sesuai.
                </p>
            </Dragger>
        </Modal>
    );
}

export default ModalInsertContent;
