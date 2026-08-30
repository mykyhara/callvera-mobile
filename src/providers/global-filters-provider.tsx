import { createContext, useContext, useState } from "react";

import { ALL_FRANCHISES, ALL_LOCATIONS, Direction } from "@/constants/filters";
import { shallowEqual } from "@/lib/utils";
import { GlobalFilters } from "@/types/api";
import { SetStateHandler, UpdateObjectHandler } from "@/types/utils";

interface GlobalFiltersContextType {
  filters: GlobalFilters;
  setFilters: SetStateHandler<GlobalFilters>;
  updateFilter: UpdateObjectHandler<GlobalFilters>;
  resetFilters: () => void;
  activeCount: number;
  isDefault: boolean;
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

  const isDefault = shallowEqual(filters, DEFAULT_FILTERS);

  const activeCount = (
    Object.keys({ ...DEFAULT_FILTERS, ...filters }) as (keyof typeof filters)[]
  ).reduce(
    (count, key) => (filters[key] !== DEFAULT_FILTERS[key] ? count + 1 : count),
    0,
  );

  return (
    <GlobalFiltersContext.Provider
      value={{
        filters,
        setFilters,
        updateFilter,
        resetFilters,
        activeCount,
        isDefault,
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
