import { PropsWithChildren, useCallback } from "react";
import { View } from "react-native";

import {
  ALL_FRANCHISES,
  ALL_LOCATIONS,
  Direction,
  DirectionType,
} from "@/constants/filters";
import { cn } from "@/lib/utils";
import { useGlobalFilters } from "@/providers/global-filters-provider";
import { GlobalFilters, LocationOption } from "@/types/api";
import { DateRange, FilterOption } from "@/types/utils";

import { DateRangePicker } from "./date-range-picker";
import { DropdownPickerOption } from "./dropdown-picker";
import { FilterChipGroup } from "./filter-chip-group";

type GlobalFiltersContext = ReturnType<typeof useGlobalFilters>;

interface GlobalFiltersBarProps extends PropsWithChildren {
  className?: string;
  locations: LocationOption[];
  franchises: string[];
  filters: GlobalFilters;
  setFilters: GlobalFiltersContext["setFilters"];
  updateFilter: GlobalFiltersContext["updateFilter"];
}

export const GlobalFiltersBar = ({
  children,
  className,
  locations,
  franchises,
  filters,
  setFilters,
  updateFilter,
}: GlobalFiltersBarProps) => {
  const locationPickerOptions = mapLocationPickerOptions(locations);
  const franchisesPickerOptions = mapFranchisesPickerOptions(franchises);

  const handleLocationChange = (value: number | typeof ALL_LOCATIONS) => {
    updateFilter("locationId", value);
  };

  const handleFranchiseChange = (value: string) => {
    updateFilter("franchise", value);
  };

  const handleDirectionChange = (value: DirectionType) => {
    updateFilter("direction", value);
  };

  const handleDateRangeChange = useCallback(
    ({ startDate, endDate }: DateRange) => {
      setFilters((prev) => ({ ...prev, startDate, endDate }));
    },
    [setFilters],
  );

  return (
    <View className={cn("gap-y-2", className)}>
      <FilterChipGroup
        label="Location"
        options={locationPickerOptions}
        selected={[filters.locationId]}
        onToggle={handleLocationChange}
      />
      <FilterChipGroup
        label="Franchise"
        options={franchisesPickerOptions}
        selected={[filters.franchise]}
        onToggle={handleFranchiseChange}
      />
      <FilterChipGroup
        label="Direction"
        options={DIRECTION_PICKER_OPTIONS}
        selected={[filters.direction]}
        onToggle={handleDirectionChange}
      />
      <DateRangePicker
        label="Dates"
        value={filters}
        onChange={handleDateRangeChange}
      />
      {children}
    </View>
  );
};

const mapLocationPickerOptions = (
  locations: LocationOption[],
): FilterOption<number | typeof ALL_LOCATIONS>[] => {
  return [
    {
      label: "All Locations",
      value: ALL_LOCATIONS,
    },
    ...locations.map((loc) => ({
      label: loc.name,
      value: loc.locationId,
    })),
  ];
};

const mapFranchisesPickerOptions = (
  franchises: string[],
): FilterOption<string>[] => {
  return [
    {
      label: "All Franchises",
      value: ALL_FRANCHISES,
    },
    ...franchises.map((name) => ({
      label: name,
      value: name,
    })),
  ];
};

const DIRECTION_PICKER_OPTIONS: DropdownPickerOption<DirectionType>[] = [
  { label: "All Directions", value: Direction.ALL },
  { label: "Inbound", value: Direction.INBOUND },
  { label: "Outbound", value: Direction.OUTBOUND },
];
