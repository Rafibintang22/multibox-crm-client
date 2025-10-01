import React, { useEffect, useState } from "react";
import { GlobalLayout } from "../components/layout";
import { HeadMain, ModalInsertSchedule, Scheduler } from "../components/atom";
import { getFunctionApi, useAlert, useModal } from "../constants";
import { MODAL_TYPE } from "../constants/modalStore";

function JadwalKontenPage() {
    const [schedules, setSchedules] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const { setCondition, setIsLoading } = useAlert();
    const { setModal } = useModal();

    const getSchedules = async () => {
        setIsLoading(true);
        try {
            const getScheduleApi = getFunctionApi("schedule", "get");
            const data = await getScheduleApi();

            setSchedules(data);
        } catch (error) {
            console.error(error);
            setCondition("Failed", "Gagal mendapatkan data jadwal");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchPlaylists = async () => {
        const getPlaylist = getFunctionApi("playlist", "get");
        const data = await getPlaylist();
        setPlaylists(data);
    };

    useEffect(() => {
        getSchedules();
        fetchPlaylists();
    }, []);
    return (
        <GlobalLayout>
            <HeadMain
                title="Jadwal Konten"
                isBtnAdd="Tambah Penjadwalan"
                funcBtnAdd={() => setModal(MODAL_TYPE.INSERT_SC)}
            />
            <Scheduler dataSource={schedules} />

            <ModalInsertSchedule onSuccess={getSchedules} playlists={playlists} />
        </GlobalLayout>
    );
}

export default JadwalKontenPage;
