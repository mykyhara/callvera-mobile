import { useCallback, useMemo, useState } from "react";
import { View } from "react-native";
import { useDebouncedCallback } from "use-debounce";

import { FilterChipGroup } from "@/components/filter-chip-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { LeadsFilters } from "@/types/api";

type FilterField = "dispositions" | "sources" | "campaigns";

function toOptions(values: string[]) {
  return values.map((value) => ({ label: value, value }));
}

interface LeadsFiltersBarProps {
  filters: LeadsFilters;
  onSearchChange: (value: string) => void;
  dispositionOptions: string[];
  sourceOptions: string[];
  campaignOptions: string[];
  onToggle: (field: FilterField, value: string) => void;
  onClear: () => void;
}

export function LeadsFiltersBar({
  filters,
  onSearchChange,
  dispositionOptions,
  sourceOptions,
  campaignOptions,
  onToggle,
  onClear,
}: LeadsFiltersBarProps) {
  const [searchText, setSearchText] = useState(filters.search);
  const debouncedSearchChange = useDebouncedCallback(onSearchChange, 300);

  const dispositionChipOptions = useMemo(
    () => toOptions(dispositionOptions),
    [dispositionOptions],
  );
  const sourceChipOptions = useMemo(
    () => toOptions(sourceOptions),
    [sourceOptions],
  );
  const campaignChipOptions = useMemo(
    () => toOptions(campaignOptions),
    [campaignOptions],
  );

  const handleChangeText = useCallback(
    (value: string) => {
      setSearchText(value);
      debouncedSearchChange(value);
    },
    [debouncedSearchChange],
  );

  const handleClear = useCallback(() => {
    debouncedSearchChange.cancel();
    setSearchText("");
    onClear();
  }, [debouncedSearchChange, onClear]);

  const hasActiveFilters =
    filters.dispositions.length > 0 ||
    filters.sources.length > 0 ||
    filters.campaigns.length > 0;

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
        label="Disposition"
        options={dispositionChipOptions}
        selected={filters.dispositions}
        onToggle={(value) => onToggle("dispositions", value)}
      />
      <FilterChipGroup
        label="Source"
        options={sourceChipOptions}
        selected={filters.sources}
        onToggle={(value) => onToggle("sources", value)}
      />
      <FilterChipGroup
        label="Campaign"
        options={campaignChipOptions}
        selected={filters.campaigns}
        onToggle={(value) => onToggle("campaigns", value)}
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
