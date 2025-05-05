import Topbar from "./components/main/topbar";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="bg-primary h-screen w-screen">
        <div>
          <Topbar />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
