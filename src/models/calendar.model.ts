export interface DayProps {
  dateString: string;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isPreviousMonth?: boolean;
  isNextMonth?: boolean;
}
