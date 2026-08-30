import { ActivityIndicator, View } from "react-native";

import { Text } from "@/components/ui/text";

import { CallDetailsHeaderSkeleton } from "./call-details-header";

export function CallDetailsNotFound() {
  return (
    <View className="flex-1 items-center justify-center p-6">
      <Text variant="muted" className="text-center">
        This call does not exist.
      </Text>
    </View>
  );
}

export function CallDetailsLoading() {
  return (
    <View className="flex-1">
      <CallDetailsHeaderSkeleton />

      <View className="flex-1 flex-row items-center justify-center gap-2 p-6">
        <ActivityIndicator />
        <Text variant="muted" className="text-center">
          Loading call...
        </Text>
      </View>
    </View>
  );
}
