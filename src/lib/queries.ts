import { mergeQueryKeys } from "@lukemorales/query-key-factory";

import { callsQueries } from "@/features/calls/services/queries";
import { conversationQueries } from "@/features/conversations/services/queries";
import { dashboardQueries } from "@/features/dashboard/services/queries";
import { leadsQueries } from "@/features/leads/services/queries";
import { notificationsQueries } from "@/features/notifications/services/queries";
import { userQueries } from "@/features/user/services/queries";

export const queries = mergeQueryKeys(
  callsQueries,
  conversationQueries,
  dashboardQueries,
  leadsQueries,
  notificationsQueries,
  userQueries,
);
