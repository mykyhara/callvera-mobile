import { useCallback, useState } from "react";
import { View } from "react-native";
import { useDebouncedCallback } from "use-debounce";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

import { CallsFilters } from "../types";

interface CallsFiltersBarProps {
  filters: CallsFilters;
  hasActiveFilters: boolean;
  onSearchChange: (value: string) => void;
  onClear: () => void;
}

export const CallsFiltersBar = ({
  filters,
  onSearchChange,
  hasActiveFilters,
  onClear,
}: CallsFiltersBarProps) => {
  const [searchText, setSearchText] = useState(filters.search);
  const debouncedSearchChange = useDebouncedCallback(onSearchChange, 300);

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
};
