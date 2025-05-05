import Topbar from "./components/topbar/topbar";
import { ThemeProvider } from "./components/theme-provider";
import Dock from "./components/dock/dock";
import bgImage from "./assets/wallpaper-1.png";

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
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
