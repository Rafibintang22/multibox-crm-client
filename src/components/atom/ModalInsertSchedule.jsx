// ModalInsertSchedule.jsx
import { Modal, Form, Select, DatePicker } from "antd";
import { useState } from "react";
import { getFunctionApi, useModal } from "../../constants";
import { MODAL_TYPE } from "../../constants/modalStore";

const { RangePicker } = DatePicker;

function ModalInsertSchedule({ onSuccess, playlists = [] }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const { isModalOpen, setModal } = useModal();
    const addScheduleApi = getFunctionApi("schedule", "post");

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);

            const payload = {
                playlist_id: values.playlist_id, // fallback ke store
                start_time: Math.floor(values.daterange[0].valueOf() / 1000),
                end_time: Math.floor(values.daterange[1].valueOf() / 1000),
                repeat_pattern: values.repeat_pattern,
            };

            await addScheduleApi(payload);

            if (onSuccess) onSuccess();
            form.resetFields();
            setModal(false);
        } catch (err) {
            console.error("Gagal tambah jadwal:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        setModal(false);
    };

    return (
        <Modal
            title="Tambah Jadwal"
            open={isModalOpen === MODAL_TYPE.INSERT_SC}
            onCancel={handleCancel}
            onOk={handleOk}
            confirmLoading={loading}
            centered
            destroyOnHidden
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Playlist"
                    name="playlist_id"
                    rules={[{ required: true, message: "Pilih playlist" }]}
                >
                    <Select
                        placeholder="Pilih playlist"
                        options={playlists.map((pl) => ({
                            value: pl.playlist_id,
                            label: pl.name,
                        }))}
                    />
                </Form.Item>

                <Form.Item
                    label="Waktu"
                    name="daterange"
                    rules={[{ required: true, message: "Pilih rentang waktu" }]}
                >
                    <RangePicker showTime />
                </Form.Item>

                <Form.Item
                    label="Repeat Pattern"
                    name="repeat_pattern"
                    initialValue="daily"
                    rules={[{ required: true, message: "Pilih pola repeat" }]}
                >
                    <Select
                        options={[
                            { value: "daily", label: "Daily" },
                            { value: "weekly", label: "Weekly" },
                            { value: "monthly", label: "Monthly" },
                        ]}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default ModalInsertSchedule;
