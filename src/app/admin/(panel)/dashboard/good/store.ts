import { create } from "zustand";

export enum DelStore {
    preDelete,
    success,
}

export enum EditStore {
    edit,
    success,
}

interface DelState{
    step: DelStore
    setStep: (step: DelStore) => void
}

interface EditState{
    step: EditStore
    setStep: (step: EditStore) => void
}

interface GoodState {
    goodId: string
    setGoodId: (goodId: string) => void
}

export const useDelStore = create<DelState>((set) => ({
    step: DelStore.preDelete,
    setStep: (step) => set({ step }),
}))

export const useEditStore = create<EditState>((set) => ({
    step: EditStore.edit,
    setStep: (step) => set({ step }),
}))

export const useGoodStore = create<GoodState>((set) => ({
    goodId: "",
    setGoodId: (goodId) => set({ goodId }),
}))
