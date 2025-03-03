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

interface ReviewState{
    step: ReviewStep
    setStep: (step: ReviewStep) => void
}

interface EditState{
    step: EditStep
    setStep: (step: EditStep) => void
}

export const useReviewStore = create<ReviewState>((set) => ({
    step: ReviewStep.Default,
    setStep: (step) => set({ step }),
}))

export const useEditStore = create<EditState>((set) => ({
    step: EditStep.Edit,
    setStep: (step) => set({ step }),
}))