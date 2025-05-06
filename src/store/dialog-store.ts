import { create } from "zustand";

interface DialogState {
  appMenuOpen: boolean;
  setAppMenuOpen: (open: boolean) => void;
}

export const useDialogStore = create<DialogState>()((set) => ({
  appMenuOpen: false,
  setAppMenuOpen: (open: boolean) => set({ appMenuOpen: open }),
}));
