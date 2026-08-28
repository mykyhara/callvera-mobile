import { View } from "react-native";

import { Text } from "@/components/ui/text";

export function LeadDetailsNotFound() {
  return (
    <View className="flex-1 items-center justify-center p-6">
      <Text variant="muted" className="text-center">
        This lead does not exist.
      </Text>
    </View>
  );
}
