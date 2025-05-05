import Topbar from "./components/topbar/topbar";
import { ThemeProvider } from "./components/theme-provider";
import Dock from "./components/dock/dock";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="bg-muted h-screen w-screen">
        <div className="h-full flex flex-col">
          <Topbar />
          <Dock />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
