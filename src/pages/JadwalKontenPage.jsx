import React from "react";
import { GlobalLayout } from "../components/layout";
import { HeadMain, Scheduler } from "../components/atom";

function JadwalKontenPage() {
    return (
        <GlobalLayout>
            <HeadMain title="Jadwal Konten" />
            <Scheduler />
        </GlobalLayout>
    );
}

export default JadwalKontenPage;
