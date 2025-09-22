// useAuth.js (pakai Zustand contoh)
import { create } from "zustand";
import { getFunctionApi } from "./apiRegistry";

const useAuth = create((set) => ({
    user: null,
    loading: true,
    error: null,

    verifySession: async () => {
        set({ loading: true });
        try {
            const res = await getFunctionApi("auth", "verify")();

            set({ user: res.user, loading: false, error: null });
            return res.user;
        } catch (err) {
            set({ user: null, loading: false, error: err });
            return null;
        }
    },

    logout: async () => {
        await getFunctionApi("auth", "logout")();
        set({ user: null });
    },
}));

export default useAuth;
