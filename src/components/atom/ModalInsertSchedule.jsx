// ModalInsertSchedule.jsx
import { Modal, Form, Select, DatePicker, Switch, TimePicker } from "antd";
import { getFunctionApi, useAlert, useModal } from "../../constants";
import { MODAL_TYPE } from "../../constants/modalStore";
import { ALERT_TYPE } from "../../constants/alertStore";

const { RangePicker } = DatePicker;

function ModalInsertSchedule({ onSuccess, playlists = [] }) {
    const [form] = Form.useForm();
    const { setCondition, setIsLoading, isLoading } = useAlert();

    const { isModalOpen, setModal } = useModal();
    const addScheduleApi = getFunctionApi("schedule", "post");

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            setIsLoading(true);

            const payload = {
                is_urgent: values.isUrgent || false,
                playlist_id: values.playlist_id,
                airport_id: 1, // sementara hardcode, atau ambil dari state/context
                start_date: values.daterange[0].valueOf(),
                end_date: values.daterange[1].valueOf(),
                start_time: values.startTime.format("HH:mm:ss"),
                end_time: values.endTime.format("HH:mm:ss"),
                repeat_pattern: values.repeat_pattern,
            };

            await addScheduleApi(payload);

            setCondition(ALERT_TYPE.SUCCESS, "Berhasil menambahkan jadwal");

            if (onSuccess) onSuccess();
            form.resetFields();
            setModal(false);
        } catch (err) {
            console.error("Gagal tambah jadwal:", err);
            setCondition(ALERT_TYPE.FAILED, "Gagal menambahkan jadwal");
        } finally {
            setIsLoading(false);
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
            confirmLoading={isLoading}
            centered
            destroyOnHidden
        >
            <Form form={form} layout="vertical">
                <Form.Item name="isUrgent" label="Konten darurat ?" layout="inline">
                    <Switch />
                </Form.Item>
                <Form.Item
                    label="Playlist"
                    name="playlist_id"
                    rules={[{ required: true, message: "Pilih playlist" }]}
                >
                    <Select
                        placeholder="Pilih playlist"
                        options={
                            playlists &&
                            playlists.map((pl) => ({
                                value: pl.playlist_id,
                                label: pl.name,
                            }))
                        }
                    />
                </Form.Item>

                <Form.Item
                    label="Tanggal mulai - tanggal berakhir"
                    name="daterange"
                    rules={[{ required: true, message: "Pilih rentang tanggal" }]}
                >
                    <RangePicker className="w-full" />
                </Form.Item>

                <div className="flex w-full gap-3">
                    <Form.Item
                        label="Waktu mulai"
                        name="startTime"
                        rules={[{ required: true, message: "Pilih rentang waktu" }]}
                        className="w-full"
                    >
                        <TimePicker className="w-full" />
                    </Form.Item>
                    <Form.Item
                        label="Waktu berakhir"
                        name="endTime"
                        rules={[{ required: true, message: "Pilih rentang waktu" }]}
                        className="w-full"
                    >
                        <TimePicker className="w-full" />
                    </Form.Item>
                </div>

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
