import { View } from "react-native";

import { SkeletonText } from "@/components/skeleton-text";
import { Text } from "@/components/ui/text";

import { CallDetailsViewModel } from "../types";

interface CallDetailsHeaderProps {
  call: CallDetailsViewModel;
}

export function CallDetailsHeader({ call }: CallDetailsHeaderProps) {
  return (
    <View className="bg-card border-b-border -mx-4 gap-1 border-b px-4 pb-4">
      <Text variant="h3">{call.customerName || "Unknown name"}</Text>
      <Text variant="muted" className="text-sm">
        {call.customerEmail || "(email not added)"}
      </Text>
    </View>
  );
}

export function CallDetailsHeaderSkeleton() {
  return (
    <View className="bg-card border-b-border -mx-4 gap-1 border-b px-4 pb-4">
      <SkeletonText variant="h3" />
      <SkeletonText className="text-sm" />
    </View>
  );
}
