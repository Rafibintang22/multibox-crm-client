import React from "react";
import { GlobalLayout } from "../components/layout";
import { HeadMain, Scheduler } from "../components/atom";

function AturKonten() {
    return (
        <GlobalLayout>
            <HeadMain title="atur konten" />

            <Scheduler />
        </GlobalLayout>
    );
}

export default AturKonten;
