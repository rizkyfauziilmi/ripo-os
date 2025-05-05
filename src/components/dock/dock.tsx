import { JSX } from "react";
import Alacritty from "../icons/alacritty";
import Discord from "../icons/discord";
import GitHub from "../icons/github";
import Gmail from "../icons/gmail";
import Spotify from "../icons/spotify";
import WhatsApp from "../icons/whatsapp";
import ZenBrowser from "../icons/zen";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// interface DockProps {
//   side?: "left" | "right" | "bottom";
//   autoHide?: boolean;
// }

function Dock() {
  const icon: Map<string, () => JSX.Element> = new Map([
    ["zen", () => <ZenBrowser className="size-10 cursor-pointer" />],
    ["alacritty", () => <Alacritty className="size-10 cursor-pointer" />],
    ["github", () => <GitHub className="size-10 cursor-pointer" />],
    ["discord", () => <Discord className="size-10 cursor-pointer" />],
    ["whatsapp", () => <WhatsApp className="size-10 cursor-pointer" />],
    ["spotify", () => <Spotify className="size-10 cursor-pointer" />],
    ["gmail", () => <Gmail className="size-10 cursor-pointer" />],
  ]);

  return (
    <div className="flex items-center w-fit flex-1">
      <div className="ml-2 flex flex-col justify-center gap-6 px-2 rounded-md py-4 bg-background/80">
        <TooltipProvider>
          {Array.from(icon).map(([key, IconComponent]) => (
            <Tooltip key={key}>
              <TooltipTrigger>
                <IconComponent />
              </TooltipTrigger>
              <TooltipContent
                side="right"
                withArrow={false}
                align="center"
                sideOffset={15}
              >
                <p className="text-sm">{key}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
}

export default Dock;
