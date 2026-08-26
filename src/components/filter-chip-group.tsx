import { ScrollView, View } from "react-native";

import { Button } from "./ui/button";
import { Text } from "./ui/text";
import { FilterOption } from "@/types/utils";

export interface FilterChipGroupProps<T> {
  label: string;
  options: FilterOption<T>[];
  selected: T[];
  onToggle: (value: T) => void;
}

function FilterChipGroup<T>({
  label,
  options,
  selected,
  onToggle,
}: FilterChipGroupProps<T>) {
  if (options.length === 0) return null;

  return (
    <View className="gap-1">
      <Text variant="muted" className="text-xs">
        {label}
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-2">
          {options.map((option) => {
            const isSelected = selected.includes(option.value);
            return (
              <Button
                key={String(option.value)}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onPress={() => onToggle(option.value)}
              >
                <Text>{option.label}</Text>
              </Button>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

export { FilterChipGroup };
