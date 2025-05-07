import { useEffect } from "react";
import {
  FolderOpen,
  Lock,
  Moon,
  PowerOff,
  RotateCcw,
  Settings,
  Sun,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useDialogStore } from "@/store/dialog-store";
import { useTheme } from "./theme-provider";
import ZenBrowser from "./icons/zen";
import Alacritty from "./icons/alacritty";
import WhatsApp from "./icons/whatsapp";
import GitHub from "./icons/github";
import Discord from "./icons/discord";
import Spotify from "./icons/spotify";
import Gmail from "./icons/gmail";
import useWindowStore from "@/store/window-store";

const applications = [
  { Icon: ZenBrowser, name: "Zen Browser" },
  { Icon: Alacritty, name: "Alacritty" },
  { Icon: FolderOpen, name: "File Explorer", className: "fill-gray-400" },
  { Icon: WhatsApp, name: "WhatsApp" },
  { Icon: GitHub, name: "GitHub" },
  { Icon: Discord, name: "Discord" },
  { Icon: Spotify, name: "Spotify" },
  { Icon: Gmail, name: "Gmail" },
];

function AppMenu() {
  const { openWindow } = useWindowStore();
  const { appMenuOpen, setAppMenuOpen } = useDialogStore();
  const { theme, setTheme } = useTheme();

  const handleSelect = (callback: () => void) => {
    callback();
    setAppMenuOpen(false);
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const ThemeIcon = theme === "dark" ? Sun : Moon;
  const themeText = `Toggle ${theme === "dark" ? "Light" : "Dark"} Theme`;

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setAppMenuOpen(!appMenuOpen);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [appMenuOpen, setAppMenuOpen]);

  return (
    <CommandDialog open={appMenuOpen} onOpenChange={setAppMenuOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Applications">
          {applications.map(({ Icon, name, className }) => (
            <CommandItem
              key={name}
              onSelect={() => handleSelect(() => openWindow(name))}
            >
              <Icon className={className} />
              <span>{name}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Commands">
          <CommandItem onSelect={() => handleSelect(() => window.close())}>
            <PowerOff />
            <span>Power Off</span>
          </CommandItem>
          <CommandItem
            onSelect={() => handleSelect(() => window.location.reload())}
          >
            <RotateCcw />
            <span>Restart</span>
          </CommandItem>
          <CommandItem>
            <Lock />
            <span>Lock</span>
          </CommandItem>
          <CommandItem>
            <Settings />
            <span>Settings</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(toggleTheme)}>
            <ThemeIcon />
            <span>{themeText}</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export default AppMenu;
