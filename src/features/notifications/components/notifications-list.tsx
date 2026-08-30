import { useCallback, useMemo } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  View,
} from "react-native";

import { ClearFiltersButton } from "@/components/clear-filters-button";
import { cn, isAuthError } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";
import { useGlobalFilters } from "@/providers/global-filters-provider";

import {
  useMarkNotificationHandled,
  useNotificationsList,
} from "../hooks/use-notifications";
import { Notification } from "../types";
import { NotificationCard } from "./notification-card";
import {
  NotificationsListEmpty,
  NotificationsListError,
  NotificationsListFooter,
  NotificationsListSkeleton,
} from "./notifications-list-states";

export function NotificationsList() {
  const { locations } = useAuth();
  const { isDefault: isDefaultFilters, resetFilters } = useGlobalFilters();
  const hasLocations = locations.length > 0;

  const {
    data,
    error,
    isPending,
    isError,
    isPlaceholderData,
    isFetchingNextPage,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useNotificationsList();

  const markHandled = useMarkNotificationHandled();

  const rows = useMemo(
    () => data?.pages.flatMap((page) => page.rows) ?? [],
    [data?.pages],
  );

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleRefresh = useCallback(() => {
    void refetch();
  }, [refetch]);

  const handleMarkHandled = useCallback(
    (id: string) => {
      markHandled.reset();
      markHandled.mutate(id);
    },
    [markHandled],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Notification>) => {
      const isThisMutation = markHandled.variables === item.id;
      return (
        <NotificationCard
          notification={item}
          isMarking={isThisMutation && markHandled.isPending}
          markError={
            isThisMutation && markHandled.isError
              ? markHandled.error instanceof Error
                ? markHandled.error.message
                : "Unable to mark this notification as handled."
              : null
          }
          onMarkHandled={() => handleMarkHandled(item.id)}
        />
      );
    },
    [
      handleMarkHandled,
      markHandled.error,
      markHandled.isError,
      markHandled.isPending,
      markHandled.variables,
    ],
  );

  const emptyMessage = getEmptyMessage({
    hasLocations,
    isPending,
    hasError: isError,
    hasActiveFilters: !isDefaultFilters,
    hasResults: rows.length > 0,
    isAccessDenied: isAuthError(error),
  });

  return (
    <View className="flex-1 gap-3">
      {isPending ? (
        <NotificationsListSkeleton />
      ) : isError && rows.length === 0 ? (
        <NotificationsListError
          message={
            isAuthError(error)
              ? "You don't have access to view this."
              : error instanceof Error
                ? error.message
                : undefined
          }
          onRetry={refetch}
        />
      ) : (
        <View className={cn("flex-1", isPlaceholderData && "opacity-60")}>
          <FlatList
            data={rows}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ItemSeparatorComponent={NotificationSeparator}
            contentContainerClassName="grow"
            keyboardShouldPersistTaps="handled"
            onEndReachedThreshold={0.4}
            onEndReached={handleEndReached}
            refreshControl={
              <RefreshControl
                refreshing={isRefetching && !isFetchingNextPage && !isPending}
                onRefresh={handleRefresh}
              />
            }
            ListEmptyComponent={
              <>
                <NotificationsListEmpty message={emptyMessage} />
                {!isDefaultFilters && (
                  <ClearFiltersButton onPress={resetFilters} />
                )}
              </>
            }
            ListFooterComponent={
              <NotificationsListFooter
                isFetchingNextPage={isFetchingNextPage}
                hasReachedEnd={!hasNextPage && rows.length > 0}
              />
            }
          />
        </View>
      )}
    </View>
  );
}

const NotificationSeparator = () => <View className="h-3" />;

function getEmptyMessage({
  hasLocations,
  isPending,
  hasError,
  hasActiveFilters,
  hasResults,
  isAccessDenied,
}: {
  hasLocations: boolean;
  isPending: boolean;
  hasError: boolean;
  hasActiveFilters: boolean;
  hasResults: boolean;
  isAccessDenied: boolean;
}) {
  if (!hasLocations) {
    return "No locations have been assigned to this user.";
  }

  if (isPending || hasResults || hasError) {
    return "";
  }

  if (isAccessDenied) {
    return "You don't have access to view this.";
  }

  if (hasActiveFilters) {
    return "No notifications match your filters.";
  }

  return "No notifications yet.";
}
