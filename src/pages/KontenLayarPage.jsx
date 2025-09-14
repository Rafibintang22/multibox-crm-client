import { GlobalLayout } from "../components/layout";
import {
    FileViewer,
    HeadMain,
    ModalInsertContent,
    ModalInsertPlaylist,
    ModalPlaylistDetail,
    TableComp,
} from "../components/atom";
import { getColumnsPlaylist } from "../constants/columnData";
import { useAlert, getFunctionApi, useModal } from "../constants";
import { useEffect, useState } from "react";
import { MODAL_TYPE } from "../constants/modalStore";

function KontenLayarPage() {
    const { setCondition, setIsLoading } = useAlert();
    const { setModal, setID, getOneID } = useModal();

    const [dataPlaylist, setDataPlaylist] = useState([]);
    const [dataContent, setDataContent] = useState([]);

    const getPlaylistData = async () => {
        setIsLoading(true);
        try {
            const getPlaylist = getFunctionApi("playlist", "get");
            const dataPlaylist = await getPlaylist();
            setDataPlaylist(dataPlaylist);
        } catch (error) {
            console.error(error);
            setCondition("Failed", `Gagal Mendapatkan Data Playlist`);
        } finally {
            setIsLoading(false);
        }
    };

    const getContentData = async () => {
        setIsLoading(true);
        try {
            const getContent = getFunctionApi("content", "get");
            const dataContent = await getContent();

            setDataContent(dataContent);
        } catch (error) {
            console.error(error);
            setCondition("Failed", `Gagal Mendapatkan Data Content`);
        } finally {
            setIsLoading(false);
        }
    };
    // fetch sekali saat dimount
    useEffect(() => {
        getPlaylistData();
        getContentData();
    }, []);

    // aksi tombol
    const handleDetail = (record) => {
        setID(record.playlist_id);
        setModal(MODAL_TYPE.DETAIL_PL);
    };

    const columnsPlaylist = getColumnsPlaylist(handleDetail);

    return (
        <>
            <GlobalLayout>
                <HeadMain
                    title="Daftar Playlist"
                    isBtnAdd={"Tambah Playlist"}
                    funcBtnAdd={() => setModal(MODAL_TYPE.INSERT_PL)}
                />
                <TableComp columns={columnsPlaylist} dataSource={dataPlaylist} />
                <div className="mb-11"></div>
                <HeadMain
                    title="Daftar Konten"
                    isBtnAdd={"Tambah Konten"}
                    funcBtnAdd={() => setModal(MODAL_TYPE.INSERT_CT)}
                />
                <FileViewer dataSource={dataContent} />
            </GlobalLayout>

            <ModalInsertPlaylist onSuccess={getPlaylistData} />
            <ModalInsertContent onSuccess={getContentData} />

            <ModalPlaylistDetail />
        </>
    );
}

export default KontenLayarPage;
