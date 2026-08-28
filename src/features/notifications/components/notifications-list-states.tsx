import { ActivityIndicator, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";

const SKELETON_CARD_COUNT = 6;

export function NotificationsListSkeleton() {
  return (
    <View className="gap-3">
      {Array.from({ length: SKELETON_CARD_COUNT }).map((_, index) => (
        <Card key={index} className="gap-3 px-4 py-4">
          <View className="flex-row gap-2">
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </View>
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </Card>
      ))}
    </View>
  );
}

export function NotificationsListError({
  message,
  onRetry,
}: {
  message?: string;
  onRetry: () => void;
}) {
  return (
    <View className="flex-1 items-center justify-center gap-3 p-6">
      <Text variant="muted" className="text-center">
        {message || "Something went wrong while loading notifications."}
      </Text>
      <Button variant="outline" onPress={() => onRetry()}>
        <Text>Retry</Text>
      </Button>
    </View>
  );
}

export function NotificationsListEmpty({ message }: { message: string }) {
  return (
    <View className="items-center justify-center p-10">
      <Text variant="muted" className="text-center">
        {message}
      </Text>
    </View>
  );
}

export function NotificationsListFooter({
  isFetchingNextPage,
  hasReachedEnd,
}: {
  isFetchingNextPage: boolean;
  hasReachedEnd: boolean;
}) {
  if (isFetchingNextPage) {
    return (
      <View className="items-center py-4">
        <ActivityIndicator />
      </View>
    );
  }
  if (hasReachedEnd) {
    return (
      <View className="items-center py-4">
        <Text variant="muted" className="text-xs">
          You&apos;ve reached the end.
        </Text>
      </View>
    );
  }
  return null;
}
