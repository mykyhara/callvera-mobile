import { mergeQueryKeys } from "@lukemorales/query-key-factory";

import { dashboardQueries } from "@/features/dashboard/services/queries";
import { leadsQueries } from "@/features/leads/services/queries";
import { userQueries } from "@/features/user/services/queries";

export const queries = mergeQueryKeys(
  dashboardQueries,
  leadsQueries,
  userQueries,
);
