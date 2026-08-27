import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from "react-native-ui-datepicker";

import { DateRange } from "@/types/utils";

dayjs.extend(utc);

interface RangeCalendarProps {
  value: DateRange;
  onChange: (value: DateRange) => void;
}

export function RangeCalendar({
  value: selected,
  onChange,
}: RangeCalendarProps) {
  const defaultStyles = useDefaultStyles();

  return (
    <DateTimePicker
      mode="range"
      allowRangeReset
      startDate={selected.startDate}
      endDate={selected.endDate}
      onChange={({ startDate, endDate }) =>
        onChange({
          startDate: serialize(startDate),
          endDate: serialize(endDate),
        })
      }
      styles={defaultStyles}
    />
  );
}

const serialize = (dt: DateType): string | null =>
  dt !== null && dt !== undefined
    ? dayjs(dt).utc(true).format("YYYY-MM-DD")
    : (dt ?? null);
