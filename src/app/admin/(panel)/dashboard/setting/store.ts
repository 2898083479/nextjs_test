import { create } from "zustand"

interface PolicyStore {
    id: string
    setId: (id: string) => void
}


export const usePolicyStore = create<PolicyStore>((set) => ({
    id: "",
    setId: (id: string) => set({ id }),
}))