import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import dayjs from "dayjs";

import {
  daysOfWeek,
  createDaysForCurrentMonth,
  createDaysForNextMonth,
  createDaysForPreviousMonth,
  getMonthDropdownOptions,
  getYearDropdownOptions,
} from "./helpers";
import { DayProps } from "../../../models/calendar.model";

interface Props {
  yearAndMonth: number[];
  onYearAndMonthChange: (arg: number[]) => void;
  renderDay: (obj: DayProps) => JSX.Element;
  selectedDate: string;
  setSelectedDate: (arg: string) => void;
  showDropdown?: boolean;
  showDaysOfWeek?: boolean;
}

export default function Calendar({
  yearAndMonth = [2021, 6],
  onYearAndMonthChange,
  renderDay = (obj: DayProps) => <></>,
  selectedDate,
  setSelectedDate,
  showDropdown,
  showDaysOfWeek,
}: Props) {
  const [year, month] = yearAndMonth;

  let currentMonthDays = createDaysForCurrentMonth(year, month);
  let previousMonthDays = createDaysForPreviousMonth(
    year,
    month,
    currentMonthDays
  );
  let nextMonthDays = createDaysForNextMonth(year, month, currentMonthDays);
  let calendarGridDayObjects = [
    ...previousMonthDays,
    ...currentMonthDays,
    ...nextMonthDays,
  ];

  const handleMonthNavBackButtonClick = () => {
    let nextYear = year;
    let nextMonth = month - 1;
    if (nextMonth === 0) {
      nextMonth = 12;
      nextYear = year - 1;
    }
    onYearAndMonthChange([nextYear, nextMonth]);
  };

  const handleMonthNavForwardButtonClick = () => {
    let nextYear = year;
    let nextMonth = month + 1;
    if (nextMonth === 13) {
      nextMonth = 1;
      nextYear = year + 1;
    }
    onYearAndMonthChange([nextYear, nextMonth]);
  };

  const handleMonthSelect = (evt: SelectChangeEvent) => {
    let nextYear = year;
    let nextMonth = parseInt(evt.target.value, 10);
    onYearAndMonthChange([nextYear, nextMonth]);
  };
  const handleYearSelect = (evt: SelectChangeEvent) => {
    let nextMonth = month;
    let nextYear = parseInt(evt.target.value, 10);
    onYearAndMonthChange([nextYear, nextMonth]);
  };
  const displayTextColor = (isCurrenMonth: boolean, isSelected: boolean) => {
    return isSelected ? "#fff" : isCurrenMonth ? "text.primary" : "#757575";
  };
  const MonthButton = (props: any) => (
    <Button
      sx={{
        width: "44px",
        minWidth: "44px",
        height: "44px",
        padding: 0,
        borderRadius: 0,
        color: "text.primary",
        "&:hover": { backgroundColor: "#e6e6e6" },
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
  return (
    <div className="calendar-root">
      <Stack
        direction={"row"}
        className="navigation-header"
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={"16px"}
      >
        <MonthButton onClick={handleMonthNavBackButtonClick}>﹤</MonthButton>
        {showDropdown ? (
          <>
            <Select
              className="year-select"
              value={year.toString()}
              onChange={handleYearSelect}
              size="small"
            >
              {getYearDropdownOptions(year).map(({ label, value }) => (
                <MenuItem value={value} key={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
            <Select
              className="month-select"
              value={month.toString()}
              onChange={handleMonthSelect}
              size="small"
            >
              {getMonthDropdownOptions().map(({ label, value }) => (
                <MenuItem value={value} key={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </>
        ) : (
          <>
            {year.toString()}年{month.toString()}月
          </>
        )}

        <MonthButton onClick={handleMonthNavForwardButtonClick}>﹥</MonthButton>
      </Stack>
      {showDaysOfWeek && (
        <Grid
          container
          className="days-of-week"
          sx={{ display: { sm: "flex" } }}
        >
          {daysOfWeek.map((day, index) => (
            <Grid item key={day}>
              <Paper
                square
                elevation={0}
                sx={{
                  bgcolor: "inherit",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "50px",
                    height: "36px",
                    fontSize: "16px",
                  }}
                >
                  {day}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
      <Grid container className="days-grid">
        {calendarGridDayObjects.map((day) => (
          <Grid
            item
            md={"auto"}
            key={day.dateString}
            onClick={() => setSelectedDate(day.dateString)}
          >
            <Paper
              square
              elevation={0}
              sx={{
                bgcolor:
                  selectedDate === day.dateString
                    ? "#006edc"
                    : day.dateString === dayjs().format("YYYY-MM-DD")
                    ? "#ffff76"
                    : "inherit",
                "&:hover": {
                  bgcolor:
                    selectedDate === day.dateString
                      ? "#006edc"
                      : day.dateString === dayjs().format("YYYY-MM-DD")
                      ? "#ffff76"
                      : "#e6e6e6",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "50px",
                  height: "36px",
                  fontSize: "16px",
                  color: displayTextColor(
                    day.isCurrentMonth,
                    selectedDate === day.dateString
                  ),
                }}
              >
                {renderDay(day)}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

interface HeaderProps {
  calendarDayObject: DayProps;
}
export function CalendarDayHeader({ calendarDayObject }: HeaderProps) {
  return (
    <span className="day-grid-item-header">
      {calendarDayObject.dayOfMonth}日
    </span>
  );
}
