import { create } from "zustand";
import { toast } from "sonner";

export interface Window {
  id: string;
  isOpen: boolean;
  appName: string;
}

interface WindowState {
  windows: Window[];
  openWindow: (appName: string) => void;
  minimizeWindow: (id: string) => void;
  unMinimizeWindow: (id: string) => void;
  closeWindow: (id: string) => void;
}

export const useWindowStore = create<WindowState>((set) => ({
  windows: [],
  openWindow: (appName: string) => {
    set((state) => {
      const existingWindow = state.windows.find(
        (window) => window.appName === appName,
      );
      if (existingWindow) {
        if (existingWindow.isOpen) {
          toast.error(`${appName} cannot be opened right now`, {
            description: "Only one instance of each app is allowed at a time.",
            position: "top-center",
            style: { marginTop: "30px" },
          });
        }
        return {
          windows: state.windows.map((window) =>
            window.id === existingWindow.id
              ? { ...window, isOpen: true }
              : window,
          ),
        };
      } else {
        const id = crypto.randomUUID();
        return {
          windows: [...state.windows, { id, isOpen: true, appName }],
        };
      }
    });
  },
  closeWindow: (id: string) =>
    set((state) => ({
      windows: state.windows.filter((window) => window.id !== id),
    })),
  minimizeWindow: (id: string) =>
    set((state) => ({
      windows: state.windows.map((window) =>
        window.id === id ? { ...window, isOpen: false } : window,
      ),
    })),
  unMinimizeWindow: (id: string) =>
    set((state) => ({
      windows: state.windows.map((window) =>
        window.id === id ? { ...window, isOpen: true } : window,
      ),
    })),
}));

export default useWindowStore;
