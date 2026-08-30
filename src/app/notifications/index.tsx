import { useBottomSheetModalRef } from "@/components/bottom-sheet";
import { FiltersButton } from "@/components/filters-button";
import { GlobalFiltersBottomSheet } from "@/components/global-filters-bottom-sheet";
import { ScreenHeader } from "@/components/screen-header";
import { ScreenTemplate } from "@/components/screen-template";
import { NotificationsList } from "@/features/notifications/components/notifications-list";
import { useGlobalFilters } from "@/providers/global-filters-provider";

export default function NotificationsScreen() {
  const filtersSheetRef = useBottomSheetModalRef();

  const { activeCount } = useGlobalFilters();

  return (
    <>
      <ScreenTemplate contentContainerClassName="gap-y-4">
        <ScreenHeader
          title="Notifications"
          withBackButton
          rightContent={
            <FiltersButton
              bottomSheetModalRef={filtersSheetRef}
              activeCount={activeCount}
            />
          }
        />
        <NotificationsList />
      </ScreenTemplate>
      <GlobalFiltersBottomSheet bottomSheetModalRef={filtersSheetRef} />
    </>
  );
}
