import { mergeQueryKeys } from "@lukemorales/query-key-factory";

import { conversationQueries } from "@/features/conversations/services/queries";
import { dashboardQueries } from "@/features/dashboard/services/queries";
import { leadsQueries } from "@/features/leads/services/leads-queries";
import { userQueries } from "@/features/user/services/queries";

export const queries = mergeQueryKeys(
  dashboardQueries,
  leadsQueries,
  userQueries,
  leadsQueries,
  conversationQueries,
);
