import { ActivityIndicator, View } from "react-native";

import { Text } from "@/components/ui/text";

import { LeadDetailsHeaderSkeleton } from "./lead-details-header";

export function LeadDetailsNotFound() {
  return (
    <View className="flex-1 items-center justify-center p-6">
      <Text variant="muted" className="text-center">
        This lead does not exist.
      </Text>
    </View>
  );
}

export function LeadDetailsLoading() {
  return (
    <View className="flex-1">
      <LeadDetailsHeaderSkeleton />

      <View className="flex-1 flex-row items-center justify-center gap-2 p-6">
        <ActivityIndicator />
        <Text variant="muted" className="text-center">
          Loading lead...
        </Text>
      </View>
    </View>
  );
}
