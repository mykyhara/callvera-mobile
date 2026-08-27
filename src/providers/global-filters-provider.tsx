import { createContext, useContext, useState } from "react";

import { ALL_FRANCHISES, ALL_LOCATIONS, Direction } from "@/constants/filters";
import { shallowEqual } from "@/lib/utils";
import { GlobalFilters } from "@/types/api";
import { SetStateHandler, UpdateObjectHandler } from "@/types/utils";

interface GlobalFiltersContextType {
  filters: GlobalFilters;
  isDefaultFilters: boolean;
  setFilters: SetStateHandler<GlobalFilters>;
  updateFilter: UpdateObjectHandler<GlobalFilters>;
  resetFilters: () => void;
}

const DEFAULT_FILTERS = {
  franchise: ALL_FRANCHISES,
  locationId: ALL_LOCATIONS,
  direction: Direction.ALL,
  startDate: null,
  endDate: null,
} as const satisfies GlobalFilters;

const GlobalFiltersContext = createContext<GlobalFiltersContextType | null>(
  null,
);

export const GlobalFiltersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [filters, setFilters] = useState<GlobalFilters>(DEFAULT_FILTERS);

  const updateFilter: UpdateObjectHandler<GlobalFilters> = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const isDefaultFilters = shallowEqual(filters, DEFAULT_FILTERS);

  return (
    <GlobalFiltersContext.Provider
      value={{
        filters,
        isDefaultFilters,
        setFilters,
        updateFilter,
        resetFilters,
      }}
    >
      {children}
    </GlobalFiltersContext.Provider>
  );
};

export const useGlobalFilters = () => {
  const context = useContext(GlobalFiltersContext);
  if (!context) {
    throw new Error(
      "useGlobalFilters must be used within a GlobalFiltersProvider",
    );
  }
  return context;
};
