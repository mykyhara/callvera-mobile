import { useCallback, useState } from "react";
import { View } from "react-native";
import { useDebouncedCallback } from "use-debounce";

import { Input } from "@/components/ui/input";

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
}
