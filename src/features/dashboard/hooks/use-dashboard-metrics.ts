import { useQuery } from "@tanstack/react-query";

import { queries } from "@/lib/queries";
import { useAuth } from "@/providers/auth-provider";
import { useGlobalFilters } from "@/providers/global-filters-provider";

export const useDashboardMetrics = () => {
  const { locations } = useAuth();
  const { filters } = useGlobalFilters();

  return useQuery({
    ...queries.dashboard.metrics({ filters, locations }),
    staleTime: 2 * 60_000,
  });
};
