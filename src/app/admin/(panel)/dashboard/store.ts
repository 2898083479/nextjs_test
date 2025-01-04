import { create } from "zustand";

export enum ReviewStep{
    Default,
    Approved,
    Rejected,
    RejectReason
}

interface ReviewState{
    step: ReviewStep
    setStep: (step: ReviewStep) => void
}

export const useStore = create<ReviewState>((set) => ({
    step: ReviewStep.Default,
    setStep: (step) => set({ step }),
}))