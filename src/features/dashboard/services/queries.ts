import { createQueryKeys } from "@lukemorales/query-key-factory";

import { GlobalFilters, LocationOption } from "@/types/api";

import { fetchDashboardMetrics } from "./api";

export const dashboardQueries = createQueryKeys("dashboard", {
  metrics: ({
    filters,
    locations,
  }: {
    filters: GlobalFilters;
    locations: LocationOption[];
  }) => ({
    queryKey: [filters],
    queryFn: () => fetchDashboardMetrics(filters, locations),
  }),
});
