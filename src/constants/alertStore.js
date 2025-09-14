import { create } from "zustand";

export const ALERT_TYPE = {
    SUCCESS: "SUCCESS",
    FAILED: "FAILED",
    SUBMITDIALOG: "SUBMITDIALOG",
    VOIDDIALOG: "VOIDDIALOG",
};

const useAlert = create((set) => ({
    condition: { result: null, message: null, detailMessage: null },
    isLoading: false,
    formError: null,

    setFormError: (field) => set({ formError: field }),

    setIsLoading: (cond) => set({ isLoading: cond }),

    setCondition: (result, message, detailMessage = null) =>
        set({
            condition: { result, message, detailMessage },
        }),

    handleClose: () =>
        set({
            condition: { result: null, message: null, detailMessage: null },
        }),
}));

export default useAlert;
