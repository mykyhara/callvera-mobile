import { useBottomSheetModalRef } from "@/components/bottom-sheet";
import { FiltersButton } from "@/components/filters-button";
import { GlobalFiltersBottomSheet } from "@/components/global-filters-bottom-sheet";
import { ScreenHeader } from "@/components/screen-header";
import { ScreenTemplate } from "@/components/screen-template";
import { ConversationsList } from "@/features/conversations/components/conversations-list";
import { useGlobalFilters } from "@/providers/global-filters-provider";

export default function ConversationsListScreen() {
  const filtersSheetRef = useBottomSheetModalRef();

  const { activeCount } = useGlobalFilters();

  return (
    <>
      <ScreenTemplate contentContainerClassName="flex-1 gap-y-4 pb-0">
        <ScreenHeader
          title="Conversations"
          rightContent={
            <FiltersButton
              bottomSheetModalRef={filtersSheetRef}
              activeCount={activeCount}
            />
          }
        />
        <ConversationsList />
      </ScreenTemplate>
      <GlobalFiltersBottomSheet bottomSheetModalRef={filtersSheetRef} />
    </>
  );
}
