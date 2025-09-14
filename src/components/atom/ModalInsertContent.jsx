import { Modal, message, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useModal, getFunctionApi, useAlert } from "../../constants";
import { ALERT_TYPE } from "../../constants/alertStore";
import { MODAL_TYPE } from "../../constants/modalStore";

const { Dragger } = Upload;
function ModalInsertContent({ onSuccess }) {
    const { setCondition, handleClose, condition } = useAlert();

    const { isModalOpen, setModal } = useModal();
    const postContent = getFunctionApi("content", "post");

    const props = {
        name: "file",
        multiple: true,
        // Gunakan customRequest agar bisa pakai API sendiri
        customRequest: async ({ file, onSuccess: onUploadSuccess, onError }) => {
            try {
                const formData = new FormData();
                formData.append("file", file);

                await postContent(formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                // ✅ Set alert
                setCondition(ALERT_TYPE.SUCCESS, `${file.name} berhasil diupload`);

                // ✅ Tutup modal
                setModal(false);

                // ✅ Refresh halaman/data
                if (onSuccess) onSuccess();

                // ✅ Update status upload AntD
                onUploadSuccess("ok");
            } catch (err) {
                setCondition(ALERT_TYPE.FAILED, `${file.name} gagal diupload`, err.message);
                onError(err);
            }
        },
        onDrop(e) {
            console.log("Dropped files", e.dataTransfer.files);
        },
    };

    return (
        <Modal
            title="Tambah Konten"
            open={isModalOpen === MODAL_TYPE.INSERT_CT}
            onCancel={() => setModal(false)}
            footer={null}
            destroyOnHidden
            width={700}
            centered
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
