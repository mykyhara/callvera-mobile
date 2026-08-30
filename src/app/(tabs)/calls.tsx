import { useBottomSheetModalRef } from "@/components/bottom-sheet";
import { FiltersButton } from "@/components/filters-button";
import { GlobalFiltersBottomSheet } from "@/components/global-filters-bottom-sheet";
import { ScreenHeader } from "@/components/screen-header";
import { ScreenTemplate } from "@/components/screen-template";
import { CallsList } from "@/features/calls/components/calls-list";

export default function CallsListScreen() {
  const filtersSheetRef = useBottomSheetModalRef();

  return (
    <>
      <ScreenTemplate contentContainerClassName="gap-y-4 pb-4">
        <ScreenHeader
          title="Calls"
          rightContent={<FiltersButton bottomSheetModalRef={filtersSheetRef} />}
        />
        <CallsList />
      </ScreenTemplate>
      <GlobalFiltersBottomSheet bottomSheetModalRef={filtersSheetRef} />
    </>
  );
}
