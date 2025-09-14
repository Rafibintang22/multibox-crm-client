import { GlobalLayout } from "../components/layout";
import { FileViewer, HeadMain, TableComp } from "../components/atom";
import { getColumnsPlaylist } from "../constants/columnData";
import { useAlert, getFunctionApi } from "../constants";
import { useEffect } from "react";

function KontenLayarPage() {
    const columnsPlaylist = getColumnsPlaylist();
    const { setCondition, setIsLoading } = useAlert();

    useEffect(() => {
        const getPlaylistData = async () => {
            setIsLoading(true);
            try {
                const getPlaylist = getFunctionApi("playlist", "get");
                const dataPlaylist = await getPlaylist();
                console.log(dataPlaylist);
            } catch (error) {
                console.error(error);
                setCondition("Failed", `Gagal Mendapatkan Data Playlist`);
            } finally {
                setIsLoading(false);
            }
        };

        getPlaylistData();
    }, []);

    return (
        <GlobalLayout>
            <HeadMain title="Daftar Playlist" isBtnAdd={"Tambah Playlist"} />
            <TableComp columns={columnsPlaylist} />
            <div className="mb-11"></div>
            <HeadMain title="Daftar Konten" isBtnAdd={"Tambah Konten"} />
            <FileViewer />
        </GlobalLayout>
    );
}

export default KontenLayarPage;
