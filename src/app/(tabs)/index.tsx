import { useBottomSheetModalRef } from "@/components/bottom-sheet";
import { FiltersButton } from "@/components/filters-button";
import { GlobalFiltersBottomSheet } from "@/components/global-filters-bottom-sheet";
import { ScreenTemplate } from "@/components/screen-template";
import { DashboardMetricsGrid } from "@/features/dashboard/components/dashboard-metrics-grid";

export default function DashboardScreen() {
  const filtersSheetRef = useBottomSheetModalRef();

  return (
    <>
      <ScreenTemplate contentContainerClassName="gap-y-4 pb-4" scrollable>
        <FiltersButton bottomSheetModalRef={filtersSheetRef} />
        <DashboardMetricsGrid />
      </ScreenTemplate>
      <GlobalFiltersBottomSheet bottomSheetModalRef={filtersSheetRef} />
    </>
  );
}
