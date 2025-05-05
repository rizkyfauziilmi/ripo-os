import { JSX } from "react";
import Alacritty from "../icons/alacritty";
import Discord from "../icons/discord";
import GitHub from "../icons/github";
import Gmail from "../icons/gmail";
import Spotify from "../icons/spotify";
import WhatsApp from "../icons/whatsapp";
import ZenBrowser from "../icons/zen";

import { TooltipProvider } from "@/components/ui/tooltip";
import DockAppIcon from "./dock-app-icon";

// interface DockProps {
//   side?: "left" | "right" | "bottom";
//   autoHide?: boolean;
// }

function Dock() {
  const icon: Map<string, () => JSX.Element> = new Map([
    ["zen", () => <ZenBrowser className="size-8" />],
    ["alacritty", () => <Alacritty className="size-8" />],
    ["github", () => <GitHub className="size-8" />],
    ["discord", () => <Discord className="size-8" />],
    ["whatsapp", () => <WhatsApp className="size-8" />],
    ["spotify", () => <Spotify className="size-8" />],
    ["gmail", () => <Gmail className="size-8" />],
  ]);

  return (
    <div className="flex items-center w-fit flex-1">
      <div className="ml-2 flex flex-col justify-center gap-4 px-2 rounded-md py-4 bg-background/80 border-[1.5px]">
        <TooltipProvider>
          {Array.from(icon).map(([key, IconComponent]) => (
            <DockAppIcon app={key} icon={IconComponent} />
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
}

export default Dock;
