'use client'

import { create } from 'zustand'

export interface UserStore {
  user: {
    picture?: string
    firstName?: string
    lastName?: string
  } | null,
  set: (user: UserStore['user']) => void
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  set: userData => set({ user: userData }),
}))

export default useUserStore