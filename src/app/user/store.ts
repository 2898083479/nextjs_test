import { create } from "zustand";

export interface IUserStore {
    userId: string;
    setUserId: (userId: string) => void;
}

export const useUserStore = create<IUserStore>((set) => ({
    userId: "",
    setUserId: (userId) => set({ userId }),
}))