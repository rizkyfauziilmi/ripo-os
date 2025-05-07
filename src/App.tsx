import Topbar from "./components/topbar/topbar";
import { ThemeProvider } from "./components/theme-provider";
import Dock from "./components/dock/dock";
import AppMenu from "./components/app-menu";
import React, { useRef } from "react";
import { Toaster } from "./components/ui/sonner";
const Windows = React.lazy(() => import("./components/window/windows"));

function App() {
  const windowConstraintsRef = useRef<HTMLDivElement>(null!);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div
        className="bg-cover h-screen w-screen overflow-hidden"
        style={{
          backgroundImage:
            "url(https://w.wallhaven.cc/full/3l/wallhaven-3lxdy3.jpg)",
        }}
      >
        <div className="h-full flex flex-col w-full" ref={windowConstraintsRef}>
          <Topbar />
          <Dock />
          <Windows constraintsRef={windowConstraintsRef} />
        </div>
      </div>
      <AppMenu />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
