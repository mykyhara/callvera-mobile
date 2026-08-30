import { useCallback, useState } from "react";
import { View } from "react-native";
import { useDebouncedCallback } from "use-debounce";

import { Input } from "@/components/ui/input";

import { CallsFilters } from "../types";

interface CallsFiltersBarProps {
  filters: CallsFilters;
  onSearchChange: (value: string) => void;
}

export const CallsFiltersBar = ({
  filters,
  onSearchChange,
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

  return (
    <View className="gap-2">
      <Input
        value={searchText}
        onChangeText={handleChangeText}
        placeholder="Search by name or phone"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        clearButtonMode="always"
      />
    </View>
  );
};
