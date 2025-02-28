import { create } from "zustand";

interface StoreState {
    storeId: string;
    setStoreId: (storeId: string) => void;
}

export const useStore = create<StoreState>((set) => ({
    storeId: '',
    setStoreId: (storeId) => set({ storeId }),
}))