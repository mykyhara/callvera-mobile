import { router } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";

import { ErrorText } from "@/components/error-text";
import { Text } from "@/components/ui/text";
import { ALL_FRANCHISES, ALL_LOCATIONS } from "@/constants/filters";
import { useConversationsInfiniteQuery } from "@/features/conversations/hooks/use-conversation-queries";
import { useAuth } from "@/providers/auth-provider";
import { useGlobalFilters } from "@/providers/global-filters-provider";
import { ConversationThread } from "@/types/api";

import { ConversationFiltersBar } from "./conversation-filters-bar";
import { ConversationThreadCard } from "./conversation-thread-card";

export function ConversationsList() {
  const { locations } = useAuth();
  const { filters } = useGlobalFilters();
  const [search, setSearch] = useState("");

  const hasLocations = locations.length > 0;

  const {
    data,
    error,
    isPending,
    isFetching,
    isFetchingNextPage,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useConversationsInfiniteQuery({
    filters,
    locations,
    search,
    enabled: hasLocations,
  });

  const threads = useMemo(
    () => data?.pages.flatMap((page) => page.threads) ?? [],
    [data?.pages],
  );

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value.trim());
  }, []);

  const listEmptyMessage = getEmptyMessage({
    hasLocations,
    isPending,
    hasError: !!error,
    search,
    hasActiveFilters:
      filters.franchise !== ALL_FRANCHISES ||
      filters.locationId !== ALL_LOCATIONS ||
      !!filters.startDate ||
      !!filters.endDate,
    hasResults: threads.length > 0,
  });

  return (
    <View className="mt-safe flex-1 gap-3">
      <ConversationFiltersBar onSearchChange={handleSearchChange} />

      {error ? (
        <ErrorText>
          {error instanceof Error
            ? error.message
            : "Unable to load conversations."}
        </ErrorText>
      ) : null}

      <FlatList
        style={{ flex: 1 }}
        data={threads}
        keyExtractor={(item) => String(item.lead_id)}
        renderItem={renderThreadCard}
        ItemSeparatorComponent={ThreadSeparator}
        contentContainerClassName="grow"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        onEndReachedThreshold={0.4}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            void fetchNextPage();
          }
        }}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching && !isFetchingNextPage && !isPending}
            onRefresh={() => {
              void refetch();
            }}
          />
        }
        ListEmptyComponent={
          isPending && hasLocations ? (
            <View className="items-center py-12">
              <ActivityIndicator />
            </View>
          ) : (
            <View className="py-12">
              <Text variant="muted" className="text-center">
                {listEmptyMessage}
              </Text>
            </View>
          )
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <View className="items-center py-4">
              <ActivityIndicator />
            </View>
          ) : null
        }
        extraData={isFetching}
      />
    </View>
  );
}

const renderThreadCard = ({ item }: { item: ConversationThread }) => (
  <ConversationThreadCard
    thread={item}
    onPress={() => {
      router.navigate({
        pathname: "/conversation/[leadId]",
        params: {
          leadId: String(item.lead_id),
          name: item.name?.trim() || "Conversation",
        },
      });
    }}
  />
);

const ThreadSeparator = () => <View className="h-3" />;

function getEmptyMessage({
  hasLocations,
  isPending,
  hasError,
  search,
  hasActiveFilters,
  hasResults,
}: {
  hasLocations: boolean;
  isPending: boolean;
  hasError: boolean;
  search: string;
  hasActiveFilters: boolean;
  hasResults: boolean;
}) {
  if (!hasLocations) {
    return "No locations have been assigned to this user.";
  }

  if (isPending || hasResults || hasError) {
    return "";
  }

  if (search.trim() || hasActiveFilters) {
    return "No conversations match your filters.";
  }

  return "No conversations yet.";
}
