import { useBottomSheetModalRef } from "@/components/bottom-sheet";
import { FiltersButton } from "@/components/filters-button";
import { GlobalFiltersBottomSheet } from "@/components/global-filters-bottom-sheet";
import { ScreenHeader } from "@/components/screen-header";
import { ScreenTemplate } from "@/components/screen-template";
import { MetricsView } from "@/features/dashboard/components/metrics-view";
import { useDashboardMetrics } from "@/features/dashboard/hooks/use-dashboard-metrics";
import { useGlobalFilters } from "@/providers/global-filters-provider";

export default function DashboardScreen() {
  const filtersSheetRef = useBottomSheetModalRef();

  const { activeCount } = useGlobalFilters();

  const {
    data: metrics,
    isLoading,
    isRefetching,
    refetch,
  } = useDashboardMetrics();

  return (
    <>
      <ScreenTemplate contentContainerClassName="gap-y-4 pb-0">
        <ScreenHeader
          title="Dashboard"
          rightContent={
            <FiltersButton
              bottomSheetModalRef={filtersSheetRef}
              activeCount={activeCount}
            />
          }
        />
        <MetricsView
          metrics={metrics ?? null}
          isLoading={isLoading}
          isRefreshing={isRefetching}
          onRefresh={refetch}
        />
      </ScreenTemplate>
      <GlobalFiltersBottomSheet bottomSheetModalRef={filtersSheetRef} />
    </>
  );
}
