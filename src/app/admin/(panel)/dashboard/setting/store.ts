import { create } from "zustand"
import { Policy } from "../policy/types"

interface PolicyStore {
    policyInfo: Policy
    setPolicyInfo: (policyInfo: Policy) => void
}

export const usePolicyStore = create<PolicyStore>((set) => ({
    policyInfo: {} as Policy,
    setPolicyInfo: (policyInfo: Policy) => set({ policyInfo }),
}))