import { useBottomSheetModalRef } from "@/components/bottom-sheet";
import { FiltersButton } from "@/components/filters-button";
import { GlobalFiltersBottomSheet } from "@/components/global-filters-bottom-sheet";
import { ScreenTemplate } from "@/components/screen-template";
import { ConversationsList } from "@/features/conversations/components/conversations-list";

export default function ConversationsListScreen() {
  const filtersSheetRef = useBottomSheetModalRef();

  return (
    <>
      <ScreenTemplate contentContainerClassName="flex-1 gap-y-4 pb-0">
        <FiltersButton bottomSheetModalRef={filtersSheetRef} />
        <ConversationsList />
      </ScreenTemplate>
      <GlobalFiltersBottomSheet bottomSheetModalRef={filtersSheetRef} />
    </>
  );
}
