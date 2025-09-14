import { create } from "zustand";

const useAlert = create((set) => ({
    // ENUM SUCCESS FAILED SUBMITDIALOG, VOIDDIALOG
    condition: { result: null, message: null, detailMassage: null },
    isLoading: false,
    formError: null,
    setFormError: (field) => {
        set({ formError: field });
    },
    setIsLoading: (cond) => {
        set({ isLoading: cond });
    },
    setCondition: (cond, message, detailMassage) => {
        set({
            condition: {
                result: cond,
                message: message,
                detailMassage: detailMassage,
            },
        });
    },
    handleClose: () => {
        set({ condition: { result: null, message: null } });
    },
}));

export default useAlert;
