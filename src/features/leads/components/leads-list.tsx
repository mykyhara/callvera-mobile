import { useCallback, useMemo, useState } from "react";
import { View } from "react-native";

import { Text } from "@/components/ui/text";
import { DEFAULT_LEADS_FILTERS } from "@/constants/leads";
import { cn } from "@/lib/utils";
import { LeadsFilters } from "@/types/api";

import { useLeadsList } from "../hooks/use-leads";
import { LeadRow } from "../types";
import { LeadsFiltersBar } from "./leads-filters-bar";
import { LeadsListError, LeadsListSkeleton } from "./leads-list-states";
import { LeadsTable } from "./leads-table";

type FilterField = "dispositions" | "sources" | "campaigns";

export function LeadsList() {
  const [filters, setFilters] = useState<LeadsFilters>(DEFAULT_LEADS_FILTERS);

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
  } = useLeadsList(filters);

  const rows = useMemo(
    () => data?.pages.flatMap((page) => page.rows) ?? [],
    [data],
  );
  const isMasked = data?.pages.some((page) => page.isMasked) ?? false;

  const options = useMemo(() => {
    const dispositions = new Set<string>();
    const sources = new Set<string>();
    const campaigns = new Set<string>();
    for (const row of rows) {
      if (row.disposition) dispositions.add(row.disposition);
      if (row.source) sources.add(row.source);
      if (row.campaign) campaigns.add(row.campaign);
    }
    return {
      dispositions: [...dispositions].sort(),
      sources: [...sources].sort(),
      campaigns: [...campaigns].sort(),
    };
  }, [rows]);

  const handleSearchChange = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, search: value.trim() }));
  }, []);

  const handleToggle = useCallback((field: FilterField, value: string) => {
    setFilters((prev) => {
      const current = prev[field];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [field]: next };
    });
  }, []);

  const handleClear = useCallback(() => {
    setFilters(DEFAULT_LEADS_FILTERS);
  }, []);

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleOpenLead = useCallback((_lead: LeadRow) => {}, []);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <View className="flex-1 gap-3">
      <LeadsFiltersBar
        filters={filters}
        onSearchChange={handleSearchChange}
        dispositionOptions={options.dispositions}
        sourceOptions={options.sources}
        campaignOptions={options.campaigns}
        onToggle={handleToggle}
        onClear={handleClear}
      />

      {isMasked && (
        <Text variant="muted" className="text-xs">
          Showing limited lead data due to restricted access.
        </Text>
      )}

      {isPending ? (
        <LeadsListSkeleton />
      ) : isError && rows.length === 0 ? (
        <LeadsListError message={(error as Error)?.message} onRetry={refetch} />
      ) : (
        <View className={cn("flex-1", isPlaceholderData && "opacity-60")}>
          <LeadsTable
            rows={rows}
            refreshing={isRefetching && !isFetchingNextPage}
            onRefresh={handleRefresh}
            onEndReached={handleEndReached}
            hasNextPage={!!hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onOpenLead={handleOpenLead}
          />
        </View>
      )}
    </View>
  );
}
