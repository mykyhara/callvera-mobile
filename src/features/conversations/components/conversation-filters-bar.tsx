import { useCallback, useMemo, useState } from "react";
import { View } from "react-native";
import { useDebouncedCallback } from "use-debounce";

import { FilterChipGroup } from "@/components/filter-chip-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { ALL_FRANCHISES, ALL_LOCATIONS } from "@/constants/filters";
import { useAuth } from "@/providers/auth-provider";
import { useGlobalFilters } from "@/providers/global-filters-provider";
import { LocationOption } from "@/types/api";
import { FilterOption } from "@/types/utils";

import {
  DATE_RANGE_PRESET_OPTIONS,
  DateRangePreset,
  DateRangePresetType,
  getPresetDateRange,
} from "../utils/date-range";

const SEARCH_DEBOUNCE_MS = 300;

type LocationValue = number | typeof ALL_LOCATIONS;

interface ConversationFiltersBarProps {
  onSearchChange: (value: string) => void;
}

export function ConversationFiltersBar({
  onSearchChange,
}: ConversationFiltersBarProps) {
  const { locations } = useAuth();
  const { filters, setFilters, updateFilter, resetFilters } =
    useGlobalFilters();

  const [searchText, setSearchText] = useState("");
  const [datePreset, setDatePreset] = useState<DateRangePresetType>(
    DateRangePreset.ALL,
  );
  const debouncedSearchChange = useDebouncedCallback(
    onSearchChange,
    SEARCH_DEBOUNCE_MS,
  );

  const franchiseOptions = useMemo(
    () => toFranchiseOptions(locations),
    [locations],
  );
  const locationOptions = useMemo(
    () => toLocationOptions(locations, filters.franchise),
    [locations, filters.franchise],
  );

  const handleChangeText = useCallback(
    (value: string) => {
      setSearchText(value);
      debouncedSearchChange(value);
    },
    [debouncedSearchChange],
  );

  const handleFranchiseToggle = useCallback(
    (value: string) => {
      const franchise = value === filters.franchise ? ALL_FRANCHISES : value;

      setFilters((prev) => {
        const keepsLocation =
          franchise === ALL_FRANCHISES ||
          locations.some(
            (location) =>
              location.franchise === franchise &&
              location.locationId === prev.locationId,
          );

        return {
          ...prev,
          franchise,
          locationId: keepsLocation ? prev.locationId : ALL_LOCATIONS,
        };
      });
    },
    [filters.franchise, locations, setFilters],
  );

  const handleLocationToggle = useCallback(
    (value: LocationValue) => {
      updateFilter(
        "locationId",
        value === filters.locationId ? ALL_LOCATIONS : value,
      );
    },
    [filters.locationId, updateFilter],
  );

  const handleDatePresetToggle = useCallback(
    (value: DateRangePresetType) => {
      const preset = value === datePreset ? DateRangePreset.ALL : value;
      const { startDate, endDate } = getPresetDateRange(preset);

      setDatePreset(preset);
      setFilters((prev) => ({ ...prev, startDate, endDate }));
    },
    [datePreset, setFilters],
  );

  const handleClear = useCallback(() => {
    debouncedSearchChange.cancel();
    setSearchText("");
    setDatePreset(DateRangePreset.ALL);
    onSearchChange("");
    resetFilters();
  }, [debouncedSearchChange, onSearchChange, resetFilters]);

  const hasActiveFilters =
    !!searchText.trim() ||
    filters.franchise !== ALL_FRANCHISES ||
    filters.locationId !== ALL_LOCATIONS ||
    !!filters.startDate ||
    !!filters.endDate;

  return (
    <View className="gap-2">
      <Input
        value={searchText}
        onChangeText={handleChangeText}
        placeholder="Search by name or phone"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />

      <FilterChipGroup
        label="Franchise"
        options={franchiseOptions}
        selected={[filters.franchise]}
        onToggle={handleFranchiseToggle}
      />
      <FilterChipGroup
        label="Location"
        options={locationOptions}
        selected={[filters.locationId]}
        onToggle={handleLocationToggle}
      />
      <FilterChipGroup
        label="Dates"
        options={DATE_RANGE_PRESET_OPTIONS}
        selected={[datePreset]}
        onToggle={handleDatePresetToggle}
      />

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onPress={handleClear}
          className="self-start"
        >
          <Text>Clear filters</Text>
        </Button>
      )}
    </View>
  );
}

function toFranchiseOptions(
  locations: LocationOption[],
): FilterOption<string>[] {
  const franchises = [
    ...new Set(locations.map((location) => location.franchise).filter(Boolean)),
  ].sort((a, b) => a.localeCompare(b));

  return [
    { label: "All Franchises", value: ALL_FRANCHISES },
    ...franchises.map((franchise) => ({ label: franchise, value: franchise })),
  ];
}

function toLocationOptions(
  locations: LocationOption[],
  franchise: string,
): FilterOption<LocationValue>[] {
  const scoped =
    franchise === ALL_FRANCHISES
      ? locations
      : locations.filter((location) => location.franchise === franchise);

  const uniqueByLocationId = new Map<number, LocationOption>();
  for (const location of scoped) {
    if (!uniqueByLocationId.has(location.locationId)) {
      uniqueByLocationId.set(location.locationId, location);
    }
  }

  return [
    { label: "All Locations", value: ALL_LOCATIONS },
    ...[...uniqueByLocationId.values()]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((location) => ({
        label: location.name,
        value: location.locationId,
      })),
  ];
}
