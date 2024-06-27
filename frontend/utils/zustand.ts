// Utils file for Zustand store, to be used in the app to store the user data.

import { create } from 'zustand'

type User = {
  id: number
  username: string
  email: string
}

type UserStore = {
  user: User | null
  setUser: (user: User) => void
  logout: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}))