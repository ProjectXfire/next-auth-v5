import { create } from 'zustand';

interface AuthCode {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useCode = create<AuthCode>((set, get) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
