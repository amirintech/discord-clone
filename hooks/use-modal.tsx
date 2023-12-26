import { create } from 'zustand'

export type ModalType = 'createServer'

interface ModalStore {
  type: ModalType | null
  isOpen: boolean
  onOpen: (type: ModalType) => void
  onClose: () => void
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  onOpen(type) {
    return set({ isOpen: true, type })
  },
  onClose() {
    return set({ type: null, isOpen: false })
  },
}))
