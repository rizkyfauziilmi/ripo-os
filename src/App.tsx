import Topbar from "./components/topbar/topbar";
import { ThemeProvider } from "./components/theme-provider";
import Dock from "./components/dock/dock";
import bgImage from "./assets/wallpaper-1.png";
import AppMenu from "./components/app-menu";
import WindowApp from "./components/window/window-app";
import { useRef } from "react";
import useWindowStore from "./store/window-store";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "./components/ui/sonner";

function App() {
  const { windows } = useWindowStore();
  const windowConstraintsRef = useRef<HTMLDivElement>(null!);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div
        className="bg-cover h-screen w-screen overflow-hidden"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="h-full flex flex-col w-full" ref={windowConstraintsRef}>
          <Topbar />
          <Dock />
          <AnimatePresence>
            {windows.map(
              (window) =>
                window.isOpen && (
                  <motion.div
                    key={window.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    <WindowApp
                      window={window}
                      constraintsRef={windowConstraintsRef}
                    />
                  </motion.div>
                ),
            )}
          </AnimatePresence>
        </div>
      </div>
      <AppMenu />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
