import { router } from "expo-router";
import { useCallback, useMemo } from "react";
import { View } from "react-native";

import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

import { CallsFiltersBar } from "./calls-filters-bar";
import { CallsListError, CallsListSkeleton } from "./calls-list-states";
import { CallsTable } from "./calls-table";
import { useInfiniteCalls } from "../hooks/use-calls";
import { useCallsFilters } from "../hooks/use-calls-filters";

export function CallsList() {
  const { filters, updateFilter, resetFilters, isDefaultFilters } =
    useCallsFilters();

  const {
    data,
    isPending,
    isError,
    error,
    refetch,
    isRefetching,
    isPlaceholderData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteCalls(filters);

  const rows = useMemo(
    () => data?.pages.flatMap((page) => page.rows) ?? [],
    [data],
  );
  const isMasked = data?.pages.some((page) => page.isMasked) ?? false;

  const handleSearchChange = useCallback(
    (value: string) => {
      updateFilter("search", value.trim());
    },
    [updateFilter],
  );

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleOpenCall = useCallback((id: string) => {
    router.navigate({ pathname: "/call/[id]", params: { id: String(id) } });
  }, []);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <View className="flex-1 gap-3">
      <CallsFiltersBar
        filters={filters}
        onSearchChange={handleSearchChange}
        hasActiveFilters={!isDefaultFilters}
        onClear={resetFilters}
      />

      {isMasked && (
        <Text variant="muted" className="text-xs">
          Showing limited lead data due to restricted access.
        </Text>
      )}

      {isPending ? (
        <CallsListSkeleton />
      ) : isError && rows.length === 0 ? (
        <CallsListError message={(error as Error)?.message} onRetry={refetch} />
      ) : (
        <View className={cn("flex-1", isPlaceholderData && "opacity-60")}>
          <CallsTable
            rows={rows}
            refreshing={isRefetching && !isFetchingNextPage}
            onRefresh={handleRefresh}
            onEndReached={handleEndReached}
            hasNextPage={!!hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onOpenCall={handleOpenCall}
          />
        </View>
      )}
    </View>
  );
}
