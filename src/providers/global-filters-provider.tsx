import { createContext, useContext, useState } from "react";

import { ALL_FRANCHISES, ALL_LOCATIONS, Direction } from "@/constants/filters";
import { shallowEqual } from "@/lib/utils";
import { GlobalFilters } from "@/types/api";

interface GlobalFiltersContextType {
  filters: GlobalFilters;
  isDefaultFilters: boolean;
  setFilters: React.Dispatch<React.SetStateAction<GlobalFilters>>;
  updateFilter: <K extends keyof GlobalFilters>(
    key: K,
    value: GlobalFilters[K],
  ) => void;
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

  const updateFilter = <K extends keyof GlobalFilters>(
    key: K,
    value: GlobalFilters[K],
  ) => {
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
