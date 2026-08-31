import { CircleAlert } from "lucide-react-native";
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

export function LeadDetailsUnavailable() {
  return (
    <View className="flex-1 items-center justify-center gap-3 p-6">
      <View className="bg-muted items-center justify-center rounded-full p-3">
        <CircleAlert className="text-muted-foreground" size={24} />
      </View>
      <View className="gap-1">
        <Text className="text-center font-semibold">
          This lead isn&apos;t available
        </Text>
        <Text variant="muted" className="max-w-72 text-center">
          It may have been removed or you may no longer have access to it.
        </Text>
      </View>
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
