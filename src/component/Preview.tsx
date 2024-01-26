import { useState } from "react";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import Calendar from "./common/calendar";

const Preview = () => {
  const [yearAndMonth, setYearAndMonth] = useState([
    dayjs().year(),
    dayjs().month() + 1,
  ]);

  return (
    <Box sx={{ width: "350px" }}>
      <Calendar
        yearAndMonth={yearAndMonth}
        onYearAndMonthChange={setYearAndMonth}
      />
    </Box>
  );
};
export default Preview;
