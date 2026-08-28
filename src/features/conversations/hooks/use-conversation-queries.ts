import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

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
