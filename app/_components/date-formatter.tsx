import { format } from "date-fns";

type Props = {
  date: number;
};

const DateFormatter = ({ date }: Props) => {
  const newDate = new Date(date);
  return (
    <time dateTime={newDate.toISOString()}>
      {format(newDate, "LLLL	d, yyyy")}
    </time>
  );
};

export default DateFormatter;
