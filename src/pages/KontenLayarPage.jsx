import { GlobalLayout } from "../components/layout";
import { FileViewer, HeadMain, TableComp } from "../components/atom";
import { getColumnsPlaylist } from "../constants/columnData";
import { useAlert, getFunctionApi } from "../constants";
import { useEffect, useState } from "react";

function KontenLayarPage() {
    const columnsPlaylist = getColumnsPlaylist();
    const { setCondition, setIsLoading } = useAlert();

    const [dataPlaylist, setDataPlaylist] = useState([]);
    const [dataContent, setDataContent] = useState([]);

    useEffect(() => {
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
                console.log(dataContent);

                setDataContent(dataContent);
            } catch (error) {
                console.error(error);
                setCondition("Failed", `Gagal Mendapatkan Data Content`);
            } finally {
                setIsLoading(false);
            }
        };

        getPlaylistData();
        getContentData();
    }, []);

    return (
        <GlobalLayout>
            <HeadMain title="Daftar Playlist" isBtnAdd={"Tambah Playlist"} />
            <TableComp columns={columnsPlaylist} dataSource={dataPlaylist} />
            <div className="mb-11"></div>
            <HeadMain title="Daftar Konten" isBtnAdd={"Tambah Konten"} />
            <FileViewer dataSource={dataContent} />
        </GlobalLayout>
    );
}

export default KontenLayarPage;
