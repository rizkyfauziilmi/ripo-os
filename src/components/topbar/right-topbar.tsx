import { Power, Volume2, Wifi } from "lucide-react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import RightSheetBento from "./right-sheet-bento";

function RightTopbar() {
  return (
    <div className="flex-1 text-right">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="space-x-2">
            <Wifi />
            <Volume2 />
            <Power />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          className="m-0 p-2"
          align="end"
          sideOffset={15}
        >
          <RightSheetBento />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default RightTopbar;
