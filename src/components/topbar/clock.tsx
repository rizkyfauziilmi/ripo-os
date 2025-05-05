import { useEffect, useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ONE_SECOND } from "@/constant/time";
import CalendarTooltip from "./calendar-tooltip";

function Clock() {
  const [nowDate, setNowDate] = useState<Date>(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNowDate(new Date());
    }, ONE_SECOND);

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <small className="text-sm font-medium leading-none">
            {nowDate.toLocaleTimeString()}
          </small>
        </TooltipTrigger>
        <TooltipContent
          withArrow={false}
          sideOffset={20}
          side="bottom"
          align="center"
        >
          <CalendarTooltip />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default Clock;
