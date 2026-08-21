import { mergeQueryKeys } from "@lukemorales/query-key-factory";

import { userQueries } from "@/features/user/services/queries";

export const queries = mergeQueryKeys(userQueries);
