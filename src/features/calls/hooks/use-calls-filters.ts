import { useCallback, useState } from "react";

import { shallowEqual } from "@/lib/utils";
import { UpdateObjectHandler } from "@/types/utils";

import { CallsFilters } from "../types";

export const DEFAULT_FILTERS = {
  search: "",
} as const satisfies CallsFilters;

export const useCallsFilters = () => {
  const [filters, setFilters] = useState<CallsFilters>(DEFAULT_FILTERS);

  const updateFilter: UpdateObjectHandler<CallsFilters> = useCallback(
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
