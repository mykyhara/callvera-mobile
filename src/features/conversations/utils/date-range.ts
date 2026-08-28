import { GlobalFilters } from "@/types/api";
import { FilterOption, ValueOf } from "@/types/utils";

export const DateRangePreset = {
  ALL: "all",
  TODAY: "today",
  LAST_7_DAYS: "last-7-days",
  LAST_30_DAYS: "last-30-days",
} as const;

export type DateRangePresetType = ValueOf<typeof DateRangePreset>;

export const DATE_RANGE_PRESET_OPTIONS: FilterOption<DateRangePresetType>[] = [
  { label: "All Dates", value: DateRangePreset.ALL },
  { label: "Today", value: DateRangePreset.TODAY },
  { label: "Last 7 Days", value: DateRangePreset.LAST_7_DAYS },
  { label: "Last 30 Days", value: DateRangePreset.LAST_30_DAYS },
];

const PRESET_DAYS_BACK: Record<DateRangePresetType, number> = {
  [DateRangePreset.ALL]: 0,
  [DateRangePreset.TODAY]: 0,
  [DateRangePreset.LAST_7_DAYS]: 6,
  [DateRangePreset.LAST_30_DAYS]: 29,
};

type DateRange = Pick<GlobalFilters, "startDate" | "endDate">;

export function getPresetDateRange(preset: DateRangePresetType): DateRange {
  if (preset === DateRangePreset.ALL) {
    return { startDate: null, endDate: null };
  }

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - PRESET_DAYS_BACK[preset]);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999);

  return {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };
}
