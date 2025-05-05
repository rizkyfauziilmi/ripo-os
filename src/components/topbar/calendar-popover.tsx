import { ONE_DAY } from "@/constant/time";
import { useEffect, useState } from "react";
import { Calendar } from "../ui/calendar";
import { id } from "date-fns/locale";

function CalendarPopover() {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    setInterval(() => {
      setDate(new Date());
    }, ONE_DAY);
  }, []);

  return (
    <Calendar
      locale={id}
      firstWeekContainsDate={1}
      today={date}
      mode="default"
    />
  );
}

export default CalendarPopover;
