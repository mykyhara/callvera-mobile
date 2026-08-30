import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

import { DEFAULT_PAGE_SIZE } from "@/constants/page";
import { useMaskedFallback } from "@/hooks/use-masked-fallback";
import { queries } from "@/lib/queries";
import { isAuthError } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";
import { useGlobalFilters } from "@/providers/global-filters-provider";

import { CallsFilters, CallsPage } from "../types";

export const useInfiniteCalls = (callsFilters: CallsFilters) => {
  const { userContext, locations } = useAuth();
  const { filters: globalFilters } = useGlobalFilters();

  const maskedFallback = useMaskedFallback(globalFilters, locations);

  return useInfiniteQuery({
    ...queries.calls.list(
      userContext!,
      globalFilters,
      callsFilters,
      maskedFallback,
      DEFAULT_PAGE_SIZE,
    ),
    enabled: !!userContext,
    placeholderData: keepPreviousData,
    initialPageParam: 1,
    getNextPageParam: (lastPage: CallsPage) => {
      const loaded = lastPage.page * lastPage.pageSize;
      return lastPage.rows.length > 0 && loaded < lastPage.totalCount
        ? lastPage.page + 1
        : undefined;
    },
    retry: (failureCount, error) => !isAuthError(error) && failureCount < 2,
  });
};
