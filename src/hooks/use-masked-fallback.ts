import { useMemo } from "react";

import { ALL_FRANCHISES, ALL_LOCATIONS } from "@/constants/filters";
import {
  GlobalFilters,
  LocationOption,
  MaskedFallbackParams,
} from "@/types/api";

export const useMaskedFallback = (
  globalFilters: GlobalFilters,
  locations: LocationOption[],
): MaskedFallbackParams => {
  const { locationId, franchise } = globalFilters;

  return useMemo(() => {
    const location =
      locationId === ALL_LOCATIONS
        ? null
        : locations.find((l) => l.locationId === locationId);
    return {
      franchiseOrNull: franchise === ALL_FRANCHISES ? null : franchise,
      locationNameOrNull: location?.originalName ?? null,
    };
  }, [locations, locationId, franchise]);
};
