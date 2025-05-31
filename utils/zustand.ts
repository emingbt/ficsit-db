import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Zustand store for managing the state of the pioneer
interface PioneerState {
  avatar: string
  setAvatar: (avatar: string) => void
  name: string
  setName: (name: string) => void
  color: string
  setColor: (color: string) => void
}

export const usePioneerStore = create(
  persist<PioneerState>((set) => ({
    avatar: '',
    name: '',
    color: '',
    setAvatar: (avatar) => set({ avatar }),
    setName: (name) => set({ name }),
    setColor: (color) => set({ color }),
  }),
    { name: 'persistent-store' } // Keep the store persistent on localStorage, a storage prop is optional (localStorage chosen by default)
  ),
)
