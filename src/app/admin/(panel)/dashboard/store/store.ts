import { create } from "zustand";

export enum ReviewStep{
    Default,
    Approved,
    Rejected,
    RejectReason
}

export enum EditStep{
    Edit,
    Success
}

export enum AddStep{
    PreAdd,
    AddSuccess,
    AddFailed
}

interface ReviewState{
    step: ReviewStep
    setStep: (step: ReviewStep) => void
}

interface EditState{
    step: EditStep
    setStep: (step: EditStep) => void
}

interface AddState{
    step: AddStep
    setStep: (step: AddStep) => void
}

interface MerchantState{
    merchants: string[]
    setMerchants: (merchants: string[]) => void
}

export const useReviewStore = create<ReviewState>((set) => ({
    step: ReviewStep.Default,
    setStep: (step) => set({ step }),
}))

export const useEditStore = create<EditState>((set) => ({
    step: EditStep.Edit,
    setStep: (step) => set({ step }),
}))

export const useAddStore = create<AddState>((set) => ({
    step: AddStep.PreAdd,
    setStep: (step) => set({ step }),
}))

export const useMerchantStore = create<MerchantState>((set) => ({
    merchants: [],
    setMerchants: (merchants) => set({ merchants }),
}))