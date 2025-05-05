import { useEffect, useState } from "react";

import { ONE_SECOND } from "@/constant/time";
import CalendarPopover from "./calendar-popover";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function Clock() {
  const [nowDate, setNowDate] = useState<Date>(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNowDate(new Date());
    }, ONE_SECOND);

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  return (
    <Popover>
      <PopoverTrigger>
        <small className="text-sm font-medium leading-none hover:bg-muted px-2 py-1 cursor-pointer rounded-full">
          {nowDate.toLocaleTimeString(undefined, {
            hour12: false,
          })}
        </small>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="center" sideOffset={20}>
        <CalendarPopover />
      </PopoverContent>
    </Popover>
  );
}

export default Clock;
