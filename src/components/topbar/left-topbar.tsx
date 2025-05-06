import { Home } from "lucide-react";
import { Button } from "../ui/button";
import Workspace from "./workspace";
import { useDialogStore } from "@/store/dialog-store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SIDE_OFFSET } from "@/constant/style";

function LeftTopbar() {
  const { setAppMenuOpen, appMenuOpen } = useDialogStore();

  return (
    <div className="flex flex-1 items-center gap-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setAppMenuOpen(!appMenuOpen)}
            >
              <Home />
            </Button>
          </TooltipTrigger>
          <TooltipContent
            align="start"
            side="bottom"
            withArrow={false}
            sideOffset={SIDE_OFFSET}
          >
            <p className="text-sm text-muted-foreground">
              Press{" "}
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span> J
              </kbd>
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Workspace />
    </div>
  );
}

export default LeftTopbar;
