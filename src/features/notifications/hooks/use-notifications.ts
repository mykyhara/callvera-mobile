import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { queries } from "@/lib/queries";
import { isAuthError } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";
import { useGlobalFilters } from "@/providers/global-filters-provider";

import {
  getNotificationFilterArgs,
  isAdminRole,
  markNotificationHandled,
  NOTIFICATION_EXPIRY_DAYS,
  NOTIFICATION_PAGE_SIZE,
} from "../services/api";
import { NotificationsPage } from "../types";

export function useNotificationsList() {
  const { userContext, locations } = useAuth();
  const { filters } = useGlobalFilters();
  const filterArgs = getNotificationFilterArgs(filters, locations);

  const listArgs = {
    ...filterArgs,
    isAdmin: isAdminRole(userContext),
    pageSize: NOTIFICATION_PAGE_SIZE,
    expiryDays: NOTIFICATION_EXPIRY_DAYS,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };

  return useInfiniteQuery({
    ...queries.notifications.list(userContext!, listArgs),
    enabled: !!userContext,
    placeholderData: keepPreviousData,
    initialPageParam: 1,
    getNextPageParam: (lastPage: NotificationsPage) => {
      const loaded = lastPage.page * lastPage.pageSize;
      return lastPage.rows.length > 0 && loaded < lastPage.totalCount
        ? lastPage.page + 1
        : undefined;
    },
    retry: (failureCount, error) => !isAuthError(error) && failureCount < 2,
  });
}

export function useMarkNotificationHandled() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markNotificationHandled,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queries.notifications._def,
      });
    },
  });
}
