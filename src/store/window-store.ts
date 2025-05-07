import { create } from "zustand";
import { toast } from "sonner";

export interface Window {
  id: string;
  isOpen: boolean;
  appName: string;
  dimensions: { width: number; height: number };
}

interface WindowState {
  windows: Window[];
  openWindow: (appName: string) => void;
  minimizeWindow: (id: string) => void;
  unMinimizeWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  updateWindow: (id: string, updates: Partial<Omit<Window, "id">>) => void;
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
          toast.warning(`${appName} is already open`, {
            description:
              "You can only have one instance of this app running at a time.",
            position: "top-center",
            style: { marginTop: "30px" },
            closeButton: true,
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
          windows: [
            ...state.windows,
            {
              id,
              isOpen: true,
              appName,
              dimensions: { width: 800, height: 600 },
            },
          ],
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
  updateWindow: (id: string, updates: Partial<Omit<Window, "id">>) =>
    set((state) => ({
      windows: state.windows.map((window) =>
        window.id === id ? { ...window, ...updates } : window,
      ),
    })),
}));

export default useWindowStore;
