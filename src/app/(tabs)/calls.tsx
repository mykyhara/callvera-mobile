import { useBottomSheetModalRef } from "@/components/bottom-sheet";
import { FiltersButton } from "@/components/filters-button";
import { GlobalFiltersBottomSheet } from "@/components/global-filters-bottom-sheet";
import { ScreenHeader } from "@/components/screen-header";
import { ScreenTemplate } from "@/components/screen-template";
import { CallsList } from "@/features/calls/components/calls-list";
import { useGlobalFilters } from "@/providers/global-filters-provider";

export default function CallsListScreen() {
  const filtersSheetRef = useBottomSheetModalRef();
  const { activeCount } = useGlobalFilters();

  return (
    <>
      <ScreenTemplate contentContainerClassName="gap-y-4 pb-4">
        <ScreenHeader
          title="Calls"
          rightContent={
            <FiltersButton
              bottomSheetModalRef={filtersSheetRef}
              activeCount={activeCount}
            />
          }
        />
        <CallsList />
      </ScreenTemplate>
      <GlobalFiltersBottomSheet bottomSheetModalRef={filtersSheetRef} />
    </>
  );
}
