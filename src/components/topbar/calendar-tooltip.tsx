import { ONE_DAY } from "@/constant/time";
import { useEffect, useState } from "react";
import { Calendar } from "../ui/calendar";

function CalendarTooltip() {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    setInterval(() => {
      setDate(new Date());
    }, ONE_DAY);
  }, []);

  return <Calendar today={date} mode="default" />;
}

export default CalendarTooltip;
