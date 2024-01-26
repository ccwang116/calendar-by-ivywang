# Getting Started with Calendar by IvyWang

This project provides a calendar picker.\
<img width="350" alt="Project_screenshot" src="https://raw.githubusercontent.com/ccwang116/calendar-by-ivywang/main/public/project_screenshot.png">

## Available Scripts

In the project directory, you can run:

### `yarn install`

Install all the packages

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.

## Props

Props of the Calendar component.

> You can check example for that in Preview component.

| Name                   | Type          | Default                               | Description                                                                  |
| ---------------------- | ------------- | ------------------------------------- | ---------------------------------------------------------------------------- |
| yearAndMonth\*         | Array<number> |                                       | Number array of year and month, index 0 is year, index 1 is month.           |
| onYearAndMonthChange\* | Func          |                                       | Handle set state of yearAndMonth.                                            |
| renderDay              | Func          | A default CalendarDayHeader Component | Override the day component, Signature:(obj: DayProps) => JSX.Element;        |
| showDropdown           | bool          | false                                 | If true, it will replace year and month on the header to dropdown component. |
| showDaysOfWeek         | bool          | false                                 | If true, it will show days of week on the top of days' block.                |

### Contact

If you have any questions, feel free to contact me.
Email [Ivy.CCWang](mailto:chaochunwang@outlook.com)
