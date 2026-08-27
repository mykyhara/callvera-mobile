import { useAuth } from "@/providers/auth-provider";
import { useGlobalFilters } from "@/providers/global-filters-provider";

import {
  BottomSheetModal,
  BottomSheetModalRef,
  BottomSheetScrollView,
} from "./bottom-sheet";
import { ClearFiltersButton } from "./clear-filters-button";
import { GlobalFiltersBar } from "./global-filters-bar";

interface DashboardFiltersBottomSheetProps {
  bottomSheetModalRef: BottomSheetModalRef;
}

export const GlobalFiltersBottomSheet = ({
  bottomSheetModalRef,
}: DashboardFiltersBottomSheetProps) => {
  const authCtx = useAuth();
  const filtersCtx = useGlobalFilters();

  return (
    <BottomSheetModal ref={bottomSheetModalRef}>
      <BottomSheetScrollView contentContainerClassName="px-4 pb-safe-offset-2">
        <GlobalFiltersBar {...authCtx} {...filtersCtx}>
          <ClearFiltersButton
            onPress={filtersCtx.resetFilters}
            disabled={filtersCtx.isDefaultFilters}
          />
        </GlobalFiltersBar>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};
