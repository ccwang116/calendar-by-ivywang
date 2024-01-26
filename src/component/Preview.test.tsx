import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import Preview from "./Preview";
import dayjs from "dayjs";
const monthArr = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

describe("Verify Calender Preview", () => {
  test("The application initially displays current year", () => {
    render(<Preview />);
    const YearText = screen.getByText(`${dayjs().year().toString()}年`);
    expect(YearText).toBeInTheDocument();
  });
  test("The application initially displays current month", () => {
    render(<Preview />);
    const MonthText = screen.getByText(`${dayjs().month() + 1}月`);
    expect(MonthText).toBeInTheDocument();
  });
  test("Click the prev button will change the current month to previous month", async () => {
    render(<Preview />);
    const PrevButton = screen.getByTestId("prev-button");
    userEvent.click(PrevButton);

    await waitFor(() => {
      expect(
        screen.getByText(`${monthArr[dayjs().month()]}月`)
      ).toBeInTheDocument();
    });
  });
  test("Click the next button will change the current month to next month", async () => {
    render(<Preview />);
    const NextButton = screen.getByTestId("next-button");
    userEvent.click(NextButton);

    await waitFor(() => {
      expect(
        screen.getByText(`${monthArr[(dayjs().month() + 2) % 12]}月`)
      ).toBeInTheDocument();
    });
  });
});
