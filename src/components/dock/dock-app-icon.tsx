import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { JSX } from "react";
import { Button } from "../ui/button";

interface DockAppIconProps {
  app: string;
  icon: () => JSX.Element;
}

function DockAppIcon({ app, icon }: DockAppIconProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon" className="size-12" variant="ghost">
          {icon()}
        </Button>
      </TooltipTrigger>
      <TooltipContent
        side="right"
        withArrow={false}
        align="center"
        sideOffset={15}
      >
        <p className="text-sm">{app}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default DockAppIcon;
