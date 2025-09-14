import { create } from "zustand";

export const MODAL_TYPE = {
    INSERT_PL: "INSERT_PLAYLIST",
    DETAIL_PL: "DETAIL_PLAYLIST",
    INSERT_CT: "INSERT_CONTENT",
    INSERT_SC: "INSERT_SCHEDULE",
};

const useModal = create((set) => ({
    isModalOpen: false,
    setModal: (cond) => {
        set({ isModalOpen: cond });
    },
    getOneID: null,
    setID: (id) => {
        set({ getOneID: id });
    },
}));

export default useModal;
