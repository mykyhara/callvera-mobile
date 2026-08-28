import { createQueryKeys } from "@lukemorales/query-key-factory";

import { UserContext } from "@/types/api";

import { NotificationsPage } from "../types";
import {
  clampNotificationPageSize,
  listNotifications,
  ListNotificationsArgs,
  NOTIFICATION_PAGE_SIZE,
} from "./api";

export type NotificationsListQueryArgs = Omit<ListNotificationsArgs, "page">;

async function fetchNotificationsPage(
  ctx: UserContext,
  args: NotificationsListQueryArgs,
  page: number,
): Promise<NotificationsPage> {
  const pageSize = clampNotificationPageSize(
    args.pageSize ?? NOTIFICATION_PAGE_SIZE,
  );
  const { data, count } = await listNotifications(ctx, {
    ...args,
    page,
    pageSize,
  });

  return {
    rows: data,
    page,
    pageSize,
    totalCount: count,
  };
}

export const notificationsQueries = createQueryKeys("notifications", {
  list: (ctx: UserContext, args: NotificationsListQueryArgs) => ({
    queryKey: [ctx?.accountId ?? "", args],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      fetchNotificationsPage(ctx, args, pageParam),
  }),
});
