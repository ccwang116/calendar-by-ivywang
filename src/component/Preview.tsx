import { useState } from "react";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import Calendar, { CalendarDayHeader } from "./common/calendar";

const Preview = () => {
  const [yearAndMonth, setYearAndMonth] = useState([
    dayjs().year(),
    dayjs().month() + 1,
  ]);
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );

  return (
    <Box sx={{ width: "350px" }}>
      <Calendar
        yearAndMonth={yearAndMonth}
        onYearAndMonthChange={setYearAndMonth}
        renderDay={(calendarDayObject) => (
          <CalendarDayHeader calendarDayObject={calendarDayObject} />
        )}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        showDaysOfWeek
      />
    </Box>
  );
};
export default Preview;
