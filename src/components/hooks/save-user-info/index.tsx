import { create } from 'zustand'

interface userInfoState{
    userId: string
    setUserId: (userId: string) => void
}

export const useUserInfoStore = create<userInfoState>((set) => ({
    userId: '',
    setUserId: (userId) => set({ userId }),
}))