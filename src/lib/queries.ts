import { mergeQueryKeys } from "@lukemorales/query-key-factory";

import { leadsQueries } from "@/features/leads/services/queries";
import { userQueries } from "@/features/user/services/queries";

export const queries = mergeQueryKeys(userQueries, leadsQueries);
