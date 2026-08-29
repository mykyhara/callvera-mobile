import { useCallback, useState } from "react";

import { shallowEqual } from "@/lib/utils";
import { UpdateObjectHandler } from "@/types/utils";

import { LeadsFilters } from "../types";

export const DEFAULT_FILTERS = {
  search: "",
  dispositions: [],
  sources: [],
  campaigns: [],
} as const satisfies LeadsFilters;

export const useLeadsFilters = () => {
  const [filters, setFilters] = useState<LeadsFilters>(DEFAULT_FILTERS);

  const updateFilter: UpdateObjectHandler<LeadsFilters> = useCallback(
    (key, value) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const isDefaultFilters = shallowEqual(filters, DEFAULT_FILTERS);

  return {
    filters,
    isDefaultFilters,
    updateFilter,
    setFilters,
    resetFilters,
  };
};
