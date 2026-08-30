import { useBottomSheetModalRef } from "@/components/bottom-sheet";
import { FiltersButton } from "@/components/filters-button";
import { GlobalFiltersBottomSheet } from "@/components/global-filters-bottom-sheet";
import { ScreenHeader } from "@/components/screen-header";
import { ScreenTemplate } from "@/components/screen-template";
import { LeadsList } from "@/features/leads/components/leads-list";
import { useGlobalFilters } from "@/providers/global-filters-provider";

export default function LeadsListScreen() {
  const filtersSheetRef = useBottomSheetModalRef();
  const { activeCount } = useGlobalFilters();

  return (
    <>
      <ScreenTemplate contentContainerClassName="gap-y-4 pb-4">
        <ScreenHeader
          title="Leads"
          rightContent={
            <FiltersButton
              bottomSheetModalRef={filtersSheetRef}
              activeCount={activeCount}
            />
          }
        />
        <LeadsList />
      </ScreenTemplate>
      <GlobalFiltersBottomSheet bottomSheetModalRef={filtersSheetRef} />
    </>
  );
}
