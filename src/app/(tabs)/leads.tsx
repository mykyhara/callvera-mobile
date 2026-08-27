import { useBottomSheetModalRef } from "@/components/bottom-sheet";
import { FiltersButton } from "@/components/filters-button";
import { GlobalFiltersBottomSheet } from "@/components/global-filters-bottom-sheet";
import { ScreenTemplate } from "@/components/screen-template";
import { LeadsList } from "@/features/leads/components/leads-list";

export default function LeadsListScreen() {
  const filtersSheetRef = useBottomSheetModalRef();

  return (
    <>
      <ScreenTemplate contentContainerClassName="gap-y-4 pb-4">
        <FiltersButton bottomSheetModalRef={filtersSheetRef} />
        <LeadsList />
      </ScreenTemplate>
      <GlobalFiltersBottomSheet bottomSheetModalRef={filtersSheetRef} />
    </>
  );
}
