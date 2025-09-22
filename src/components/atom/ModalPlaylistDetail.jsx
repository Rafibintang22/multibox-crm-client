import { Modal, Descriptions, Table, Tag, Button, Form, Input, Space } from "antd";
import { useEffect, useState } from "react";
import { getFunctionApi, useAlert, useModal } from "../../constants";
import { MODAL_TYPE } from "../../constants/modalStore";
import { ALERT_TYPE } from "../../constants/alertStore";

function ModalPlaylistDetail() {
    const { isModalOpen, setModal, getOneID, setID } = useModal();
    const { setCondition } = useAlert();
    const [loading, setLoading] = useState(false);
    const [playlist, setPlaylist] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [form] = Form.useForm();
    console.log(playlist);

    useEffect(() => {
        if (!getOneID || isModalOpen !== MODAL_TYPE.DETAIL_PL) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const getOnePlaylist = getFunctionApi("playlist", "getDetail");
                const data = await getOnePlaylist(getOneID);
                setPlaylist(data);
                form.setFieldsValue({
                    name: data.name,
                    description: data.description,
                });
            } catch (err) {
                console.error("Gagal ambil detail playlist:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [getOneID, isModalOpen, form]);

    const handleClose = () => {
        setModal(false);
        setID(null);
        setPlaylist(null);
        setIsEditMode(false);
        form.resetFields();
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            const updatePlaylist = getFunctionApi("playlist", "patch");
            const payload = {
                playlist_id: playlist?.playlist_id,
                airport_id: playlist?.airport.airport_id,
                ...values,
            };

            console.log(payload);

            await updatePlaylist(payload);
            setCondition(ALERT_TYPE.SUCCESS, "Playlist berhasil diubah");
            setPlaylist({ ...playlist, ...values });
            setIsEditMode(false);
        } catch (err) {
            setCondition(ALERT_TYPE.FAILED, "Gagal mengubah playlist");
        }
    };

    const columnsContent = [
        {
            title: "Urutan",
            dataIndex: "order",
            key: "order",
            width: 80,
        },
        {
            title: "Judul",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Durasi",
            dataIndex: "duration",
            key: "duration",
            width: 120,
            render: (d) => `${d || 0} sec`,
        },
        {
            title: "URL",
            dataIndex: "url",
            key: "url",
            render: (url) => (
                <a href={url} target="_blank" rel="noreferrer">
                    {url}
                </a>
            ),
        },
    ];

    const columnsSchedule = [
        {
            title: "Tanggal mulai",
            dataIndex: "start_date",
            key: "start_date",
            render: (t) => new Date(t).toISOString().split("T")[0],
        },
        {
            title: "Tanggal berakhir",
            dataIndex: "end_date",
            key: "end_date",
            render: (t) => new Date(t).toISOString().split("T")[0],
        },
        {
            title: "Waktu mulai",
            dataIndex: "start_time",
            key: "start_time",
            render: (t) => (t ? t.slice(0, 5) : "-"),
        },
        {
            title: "Waktu berakhir",
            dataIndex: "end_time",
            key: "end_time",
            render: (t) => (t ? t.slice(0, 5) : "-"),
        },
        {
            title: "Repeat",
            dataIndex: "repeat_pattern",
            key: "repeat_pattern",
            render: (pattern) => <Tag color="blue">{pattern}</Tag>,
        },
    ];

    return (
        <Modal
            open={isModalOpen === MODAL_TYPE.DETAIL_PL}
            onCancel={handleClose}
            footer={
                <Space>
                    {isEditMode ? (
                        <>
                            <Button onClick={() => setIsEditMode(false)}>Batal</Button>
                            <Button type="primary" loading={loading} onClick={handleSave}>
                                Simpan
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={handleClose}>Tutup</Button>
                            <Button type="primary" onClick={() => setIsEditMode(true)}>
                                Ubah
                            </Button>
                        </>
                    )}
                </Space>
            }
            width={900}
            title="Detail Playlist"
            confirmLoading={loading}
        >
            {playlist ? (
                isEditMode ? (
                    <Form layout="vertical" form={form}>
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
                    </Form>
                ) : (
                    <>
                        <Descriptions bordered column={1} size="middle">
                            <Descriptions.Item label="ID Playlist">
                                {playlist.playlist_id}
                            </Descriptions.Item>
                            <Descriptions.Item label="Nama">{playlist.name}</Descriptions.Item>
                            <Descriptions.Item label="Deskripsi">
                                {playlist.description}
                            </Descriptions.Item>
                            <Descriptions.Item label="Tempat">
                                {playlist.airport?.name} ({playlist.airport?.code})
                            </Descriptions.Item>
                        </Descriptions>

                        <h3 className="mt-4 mb-2 font-semibold">Daftar Konten</h3>
                        <Table
                            dataSource={playlist.contents}
                            columns={columnsContent}
                            rowKey="content_id"
                            pagination={false}
                            scroll={{ x: "max-content" }}
                            size="small"
                        />

                        <h3 className="mt-6 mb-2 font-semibold">Penjadwalan</h3>
                        <Table
                            dataSource={playlist.schedules}
                            columns={columnsSchedule}
                            rowKey="schedule_id"
                            pagination={false}
                            scroll={{ x: "max-content" }}
                            size="small"
                        />
                    </>
                )
            ) : (
                "Loading..."
            )}
        </Modal>
    );
}

export default ModalPlaylistDetail;
