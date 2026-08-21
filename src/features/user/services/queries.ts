import { createQueryKeys } from "@lukemorales/query-key-factory";

import { UserContext } from "@/types/api";

import { fetchLocations, fetchUserContext } from "./api";

export const userQueries = createQueryKeys("user", {
  userContext: (authUserId: string) => ({
    queryKey: [authUserId],
    queryFn: () => fetchUserContext(authUserId),
  }),
  locations: (ctx: UserContext) => ({
    queryKey: [ctx?.accountId ?? ""],
    queryFn: () => fetchLocations(ctx),
  }),
});
