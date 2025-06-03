import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Zustand store for managing the state of the pioneer
type PioneerState = {
  avatar: string
  name: string
  color: string
}

type PioneerActions = {
  setAvatar: (avatar: string) => void
  setName: (name: string) => void
  setColor: (color: string) => void
  resetStore: () => void
}

const initialState: PioneerState = {
  avatar: '',
  name: '',
  color: '',
}

export const usePioneerStore = create(
  persist<PioneerState & PioneerActions>((set) => ({
    ...initialState,
    setAvatar: (avatar) => set({ avatar }),
    setName: (name) => set({ name }),
    setColor: (color) => set({ color }),
    resetStore: () => set(initialState),
  }),
    { name: 'persistent-store' } // Keep the store persistent on localStorage, a storage prop is optional (localStorage chosen by default)
  ),
)
