import { ActivityIndicator, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Table } from "@/components/ui/table";
import { Text } from "@/components/ui/text";

const SKELETON_ROW_COUNT = 8;

export function CallsListSkeleton() {
  return (
    <Table.Root className="flex-1">
      <Table.Header>
        <Table.Row>
          <Table.Head className="flex-2">
            <Text>Call</Text>
          </Table.Head>
          <Table.Head>
            {/* TODO: ?? */}
            <Text>Disposition</Text>
          </Table.Head>
          <Table.Head>
            {/* TODO: ?? */}
            <Text>Messages</Text>
          </Table.Head>
          <Table.Head className="w-20 flex-none">
            <Text> </Text>
          </Table.Head>
        </Table.Row>
      </Table.Header>

      <View>
        {Array.from({ length: SKELETON_ROW_COUNT }).map((_, index) => (
          <View key={index}>
            <Table.Row>
              <Table.Cell className="flex-2">
                <Skeleton className="h-3 w-2/3" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton className="h-3 w-3/4" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton className="h-3 w-1/3" />
              </Table.Cell>
              <Table.Cell className="w-20 flex-none">
                <Skeleton className="h-3 w-full" />
              </Table.Cell>
            </Table.Row>
            {index < SKELETON_ROW_COUNT - 1 && <Table.Separator />}
          </View>
        ))}
      </View>
    </Table.Root>
  );
}

export function CallsListError({
  message,
  onRetry,
}: {
  message?: string;
  onRetry: () => void;
}) {
  return (
    <View className="flex-1 items-center justify-center gap-3 p-6">
      <Text variant="muted" className="text-center">
        {message || "Something went wrong while loading leads."}
      </Text>
      <Button variant="outline" onPress={() => onRetry()}>
        <Text>Retry</Text>
      </Button>
    </View>
  );
}

export function CallsListEmpty() {
  return (
    <View className="items-center justify-center p-10">
      <Text variant="muted">No calls match the current filters.</Text>
    </View>
  );
}

export function CallsListFooter({
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
