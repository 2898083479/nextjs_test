import { create } from "zustand";

export enum AddStep {
    PreAdd = 'preAdd',
    Success = 'success',
}

export enum BuyStep {
    PreBuy = 'preBuy',
    Success = 'success',
}

interface AddState {
    step: AddStep;
    setStep: (step: AddStep) => void;
}

interface BuyState {
    step: BuyStep;
    setStep: (step: BuyStep) => void;
}

export const useAddStore = create<AddState>((set) => ({
    step: AddStep.PreAdd,
    setStep: (step) => set({ step }),
}));

export const useBuyStore = create<BuyState>((set) => ({
    step: BuyStep.PreBuy,
    setStep: (step) => set({ step }),
}));