import { create } from "zustand";

export interface IUserStore {
    merchantId: string;
    setMerchantId: (merchantId: string) => void;
}

export const useMerchantStore = create<IUserStore>((set) => ({
    merchantId: "",
    setMerchantId: (merchantId) => set({ merchantId }),
}))