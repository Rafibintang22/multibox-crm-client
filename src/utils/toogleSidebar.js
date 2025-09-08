import { create } from "zustand";

const toogleSidebar = create((set) => ({
    isSidebarOpen: false,
    setIsSidebarOpen: (curr) => set({ isSidebarOpen: !curr }),
}));

export default toogleSidebar;
