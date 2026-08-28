import { View } from "react-native";

import { FilterChipGroup } from "@/components/filter-chip-group";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { ALL_FRANCHISES, ALL_LOCATIONS } from "@/constants/filters";
import { useAuth } from "@/providers/auth-provider";
import { useGlobalFilters } from "@/providers/global-filters-provider";
import { LocationOption } from "@/types/api";
import { FilterOption } from "@/types/utils";

type LocationValue = number | typeof ALL_LOCATIONS;

export function NotificationsFiltersBar() {
  const { locations } = useAuth();
  const { filters, setFilters, updateFilter } = useGlobalFilters();

  const franchiseOptions = toFranchiseOptions(locations);
  const locationOptions = toLocationOptions(locations, filters.franchise);

  const hasActiveFilters =
    filters.franchise !== ALL_FRANCHISES ||
    filters.locationId !== ALL_LOCATIONS;

  const handleFranchiseToggle = (value: string) => {
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
  };

  const handleLocationToggle = (value: LocationValue) => {
    updateFilter(
      "locationId",
      value === filters.locationId ? ALL_LOCATIONS : value,
    );
  };

  const handleClear = () => {
    setFilters((prev) => ({
      ...prev,
      franchise: ALL_FRANCHISES,
      locationId: ALL_LOCATIONS,
    }));
  };

  return (
    <View className="gap-2">
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
