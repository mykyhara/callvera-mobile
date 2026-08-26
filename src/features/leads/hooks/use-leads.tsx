import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { ALL_FRANCHISES, ALL_LOCATIONS } from "@/constants/filters";
import { DEFAULT_PAGE_SIZE } from "@/constants/leads";
import { queries } from "@/lib/queries";
import { useAuth } from "@/providers/auth-provider";
import { useGlobalFilters } from "@/providers/global-filters-provider";
import { LeadsFilters } from "@/types/api";

import { isAuthError } from "@/lib/utils";
import { LeadsPage } from "../types";

export function useLeadsList(leadsFilters: LeadsFilters) {
  const { userContext, locations } = useAuth();
  const { filters: globalFilters } = useGlobalFilters();

  const maskedFallback = useMemo(() => {
    const location =
      globalFilters.locationId === ALL_LOCATIONS
        ? null
        : locations.find((l) => l.locationId === globalFilters.locationId);
    return {
      franchiseOrNull:
        globalFilters.franchise === ALL_FRANCHISES
          ? null
          : globalFilters.franchise,
      locationNameOrNull: location?.originalName ?? null,
    };
  }, [globalFilters.locationId, globalFilters.franchise, locations]);

  return useInfiniteQuery({
    ...queries.leads.list(
      userContext!,
      globalFilters,
      leadsFilters,
      maskedFallback,
      DEFAULT_PAGE_SIZE,
    ),
    enabled: !!userContext,
    placeholderData: keepPreviousData,
    initialPageParam: 1,
    getNextPageParam: (lastPage: LeadsPage) => {
      const loaded = lastPage.page * lastPage.pageSize;
      return lastPage.rows.length > 0 && loaded < lastPage.totalCount
        ? lastPage.page + 1
        : undefined;
    },
    retry: (failureCount, error) => !isAuthError(error) && failureCount < 2,
  });
}
