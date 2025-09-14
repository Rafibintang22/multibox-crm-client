import { Modal, Descriptions, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { getFunctionApi, useModal } from "../../constants";
import { MODAL_TYPE } from "../../constants/modalStore";

function ModalPlaylistDetail() {
    const { isModalOpen, setModal, getOneID, setID } = useModal();
    const [loading, setLoading] = useState(false);
    const [playlist, setPlaylist] = useState(null);

    useEffect(() => {
        if (!getOneID || isModalOpen !== "DETAIL_PLAYLIST") return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const getOnePlaylist = getFunctionApi("playlist", "getDetail");
                const data = await getOnePlaylist(getOneID);
                setPlaylist(data);
            } catch (err) {
                console.error("Gagal ambil detail playlist:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [getOneID, isModalOpen]);

    const handleClose = () => {
        setModal(false);
        setID(null);
        setPlaylist(null);
    };

    const columnsContent = [
        {
            title: "Order",
            dataIndex: "order",
            key: "order",
            width: 80,
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Duration",
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
            title: "Start Time",
            dataIndex: "start_time",
            key: "start_time",
            render: (t) => new Date(t * 1000).toLocaleString(),
        },
        {
            title: "End Time",
            dataIndex: "end_time",
            key: "end_time",
            render: (t) => new Date(t * 1000).toLocaleString(),
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
            footer={null}
            width={900}
            title="Detail Playlist"
            confirmLoading={loading}
        >
            {playlist ? (
                <>
                    <Descriptions bordered column={1} size="middle">
                        <Descriptions.Item label="Playlist ID">
                            {playlist.playlist_id}
                        </Descriptions.Item>
                        <Descriptions.Item label="Name">{playlist.name}</Descriptions.Item>
                        <Descriptions.Item label="Description">
                            {playlist.description}
                        </Descriptions.Item>
                        <Descriptions.Item label="Airport">
                            {playlist.airport?.name} ({playlist.airport?.code})
                        </Descriptions.Item>
                        <Descriptions.Item label="Created At">
                            {new Date(playlist.created_at).toLocaleString()}
                        </Descriptions.Item>
                        <Descriptions.Item label="Updated At">
                            {new Date(playlist.updated_at).toLocaleString()}
                        </Descriptions.Item>
                    </Descriptions>

                    <h3 className="mt-4 mb-2">Contents</h3>
                    <Table
                        dataSource={playlist.contents}
                        columns={columnsContent}
                        rowKey="content_id"
                        pagination={false}
                        size="small"
                    />

                    <h3 className="mt-6 mb-2">Schedules</h3>
                    <Table
                        dataSource={playlist.schedules}
                        columns={columnsSchedule}
                        rowKey="schedule_id"
                        pagination={false}
                        size="small"
                    />
                </>
            ) : (
                "Loading..."
            )}
        </Modal>
    );
}

export default ModalPlaylistDetail;
