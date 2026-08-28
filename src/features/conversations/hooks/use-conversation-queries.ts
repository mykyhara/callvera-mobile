import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";
import { AppState } from "react-native";

import { queries } from "@/lib/queries";
import { isAuthError } from "@/lib/utils";
import { GlobalFilters, LocationOption } from "@/types/api";

import {
  CONVERSATION_PAGE_SIZE,
  getConversationFilterArgs,
} from "../services/api";
import { ConversationsPage } from "../types";

export function useConversationsInfiniteQuery({
  filters,
  locations,
  search,
  enabled = true,
}: {
  filters: GlobalFilters;
  locations: LocationOption[];
  search: string;
  enabled?: boolean;
}) {
  const filterArgs = getConversationFilterArgs(filters, locations);
  const listArgs = {
    ...filterArgs,
    search: search.trim() || undefined,
    pageSize: CONVERSATION_PAGE_SIZE,
  };

  return useInfiniteQuery({
    ...queries.conversations.list(listArgs),
    enabled,
    placeholderData: keepPreviousData,
    initialPageParam: 1,
    getNextPageParam: (lastPage: ConversationsPage) => {
      const loaded = lastPage.page * lastPage.pageSize;
      return lastPage.threads.length > 0 && loaded < lastPage.totalCount
        ? lastPage.page + 1
        : undefined;
    },
    retry: (failureCount, error) => !isAuthError(error) && failureCount < 2,
  });
}

export function useConversationMessagesQuery(leadId: string | undefined) {
  const isFirstFocus = useRef(true);

  const query = useQuery({
    ...queries.conversations.messages(leadId ?? ""),
    enabled: !!leadId,
    staleTime: 0,
    refetchOnMount: "always",
    retry: (failureCount, error) => !isAuthError(error) && failureCount < 2,
  });

  const { refetch } = query;

  useFocusEffect(
    useCallback(() => {
      if (!leadId) return;

      if (isFirstFocus.current) {
        isFirstFocus.current = false;
      } else {
        void refetch();
      }

      const subscription = AppState.addEventListener("change", (state) => {
        if (state === "active") void refetch();
      });

      return () => subscription.remove();
    }, [leadId, refetch]),
  );

  return query;
}
