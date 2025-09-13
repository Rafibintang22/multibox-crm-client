import React from "react";
import { GlobalLayout } from "../components/layout";
import { HeadMain, Scheduler } from "../components/atom";

function AturKonten() {
    return (
        <GlobalLayout>
            <HeadMain title="Atur Konten" />

            <Scheduler />
        </GlobalLayout>
    );
}

export default AturKonten;
