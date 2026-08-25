import dayjs from "dayjs";
import { ComponentProps, useEffect, useRef, useState } from "react";
import { Dimensions, View } from "react-native";
import { ExtractElementRef } from "react-native-reanimated/lib/typescript/hook/commonTypes";

import { RangeCalendar } from "./range-calendar";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Text } from "./ui/text";

interface DateRangeInputProps extends ComponentProps<typeof RangeCalendar> {
  label?: string;
  placeholder?: string;
}

export const DateRangePicker = ({
  label,
  placeholder = "All Dates",
  value,
  onChange,
}: DateRangeInputProps) => {
  const triggerRef = useRef<ExtractElementRef<typeof PopoverTrigger>>(null);

  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    if (internalValue.startDate && !internalValue.endDate) return;
    onChange(internalValue);
    triggerRef.current?.close();
  }, [internalValue, onChange]);

  return (
    <View className="gap-1">
      {label && <Label>{label}</Label>}
      <View className="flex-row items-center gap-2">
        <Popover>
          <PopoverTrigger ref={triggerRef} asChild>
            <Button variant="outline" className="flex-1 px-3">
              <Text>{formatRange(value) ?? placeholder}</Text>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            className="top-safe"
            style={{ width: Dimensions.get("screen").width - 48 }}
          >
            <RangeCalendar value={internalValue} onChange={setInternalValue} />
          </PopoverContent>
        </Popover>
        <Button
          variant="secondary"
          onPress={() => setInternalValue({ startDate: null, endDate: null })}
          disabled={!internalValue.startDate && !internalValue.endDate}
        >
          <Text>Reset</Text>
        </Button>
      </View>
    </View>
  );
};

const formatRange = ({
  startDate,
  endDate,
}: DateRangeInputProps["value"]): string | null => {
  if (!startDate || !endDate) return null;

  const start = dayjs(startDate);
  const end = dayjs(endDate);

  const currentYear = dayjs().year();
  const rangeWithinCurrentYear =
    start.year() === currentYear && end.year() === currentYear;

  if (!rangeWithinCurrentYear) {
    return `${start.format("MMM DD, YYYY")} - ${end.format("MMM DD, YYYY")}`;
  }

  return `${start.format("MMM DD")} - ${end.format("MMM DD")}`;
};
