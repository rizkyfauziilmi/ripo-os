import Topbar from "./components/topbar/topbar";
import { ThemeProvider } from "./components/theme-provider";
import Dock from "./components/dock/dock";
import bgImage from "./assets/wallpaper-1.png";
import AppMenu from "./components/app-menu";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div
        className="bg-cover bg-muted h-screen w-screen"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="h-full flex flex-col">
          <Topbar />
          <Dock />
          <AppMenu />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
