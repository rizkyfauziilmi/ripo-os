import Topbar from "./components/topbar/topbar";
import { ThemeProvider } from "./components/theme-provider";
import Dock from "./components/dock/dock";
import bgImage from "./assets/wallpaper-1.png";
import AppMenu from "./components/app-menu";
import WindowApp from "./components/window/window-app";
import { useRef } from "react";

function App() {
  const windowConstraintsRef = useRef<HTMLDivElement>(null!);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div
        className="bg-cover bg-muted h-screen w-screen"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="h-full flex flex-col" ref={windowConstraintsRef}>
          <Topbar />
          <Dock />
          <WindowApp constraintsRef={windowConstraintsRef} />
        </div>
      </div>
      <AppMenu />
    </ThemeProvider>
  );
}

export default App;
