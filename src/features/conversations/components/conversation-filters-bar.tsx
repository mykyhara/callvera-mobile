import { useCallback, useState } from "react";
import { View } from "react-native";
import { useDebouncedCallback } from "use-debounce";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

const SEARCH_DEBOUNCE_MS = 300;

interface ConversationFiltersBarProps {
  onSearchChange: (value: string) => void;
}

export function ConversationFiltersBar({
  onSearchChange,
}: ConversationFiltersBarProps) {
  const [searchText, setSearchText] = useState("");

  const debouncedSearchChange = useDebouncedCallback(
    onSearchChange,
    SEARCH_DEBOUNCE_MS,
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

    onSearchChange("");
  }, [debouncedSearchChange, onSearchChange]);

  const hasActiveFilters = !!searchText.trim(); // TODO: remove with reset on text input

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
}
