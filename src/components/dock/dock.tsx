import { JSX } from "react";
import Alacritty from "../icons/alacritty";
import Discord from "../icons/discord";
import GitHub from "../icons/github";
import Gmail from "../icons/gmail";
import Spotify from "../icons/spotify";
import WhatsApp from "../icons/whatsapp";
import ZenBrowser from "../icons/zen";
import { FolderOpen } from "lucide-react";

import { TooltipProvider } from "@/components/ui/tooltip";
import DockAppIcon from "./dock-app-icon";
import useWindowStore from "@/store/window-store";
import AppIndicator from "./app-indicator";

// interface DockProps {
//   side?: "left" | "right" | "bottom";
//   autoHide?: boolean;
// }

function Dock() {
  const icon: Map<string, JSX.Element> = new Map([
    ["Zen Browser", <ZenBrowser className="size-8" />],
    ["Alacritty", <Alacritty className="size-8" />],
    ["File Explorer", <FolderOpen className="size-8 fill-gray-400" />],
    ["Whatsapp", <WhatsApp className="size-8" />],
    ["Github", <GitHub className="size-8" />],
    ["Discord", <Discord className="size-8" />],
    ["Spotify", <Spotify className="size-8" />],
    ["Gmail", <Gmail className="size-8" />],
  ]);

  const { openWindow, windows } = useWindowStore();

  return (
    <div className="flex items-center w-fit flex-1">
      <div className="ml-2 flex flex-col justify-center gap-4 px-2 rounded-md py-4 bg-background/80 border-[1.5px]">
        <TooltipProvider>
          {Array.from(icon).map(([key, IconComponent]) => {
            const currentWindow = windows.find(
              (window) => window.appName === key,
            );
            return (
              <div key={key} className="relative">
                {currentWindow && (
                  <AppIndicator isActive={currentWindow.isOpen} />
                )}
                <DockAppIcon
                  app={key}
                  icon={IconComponent}
                  onClick={() => openWindow(key)}
                />
              </div>
            );
          })}
        </TooltipProvider>
      </div>
    </div>
  );
}

export default Dock;
