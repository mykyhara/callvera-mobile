import { useQuery } from "@tanstack/react-query";

import { queries } from "@/lib/queries";
import { UserContext } from "@/types/api";

export const useUserContextQuery = (authUserId?: string) =>
  useQuery({
    ...queries.user.userContext(authUserId!),
    enabled: !!authUserId,
  });

export const useLocationsQuery = (userContext?: UserContext) =>
  useQuery({
    ...queries.user.locations(userContext!),
    enabled: !!userContext,
  });
