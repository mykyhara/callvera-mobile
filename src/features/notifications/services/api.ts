import { ALL_FRANCHISES, ALL_LOCATIONS } from "@/constants/filters";
import { supabase } from "@/lib/supabase";
import {
  GlobalFilters,
  LocationOption,
  PageResult,
  UserContext,
} from "@/types/api";

import {
  mapNotification,
  notificationRowsSchema,
} from "../schemas/notification";
import { Notification } from "../types";
import { HANDLED_STATUS } from "../utils/normalize";

export const NOTIFICATION_PAGE_SIZE = 25;
export const MAX_NOTIFICATION_PAGE_SIZE = 100;
export const NOTIFICATION_EXPIRY_DAYS = 90;

export type ListNotificationsArgs = {
  page?: number;
  pageSize?: number;
  franchise?: string;
  location?: string;
  isAdmin?: boolean;
  expiryDays?: number;
  timezone?: string;
};

export function clampNotificationPageSize(pageSize: number) {
  return Math.min(Math.max(1, pageSize), MAX_NOTIFICATION_PAGE_SIZE);
}

const ADMIN_ROLES = new Set(["admin", "owner", "manager", "super_admin"]);

export function isAdminRole(ctx: UserContext | null | undefined) {
  if (!ctx) return false;
  if (ctx.hasWriteAccess) return true;
  const role = (ctx.role ?? "").trim().toLowerCase();
  return ADMIN_ROLES.has(role);
}

export function getNotificationFilterArgs(
  filters: GlobalFilters,
  locations: LocationOption[],
): Pick<ListNotificationsArgs, "franchise" | "location"> {
  const selectedLocation =
    filters.locationId === ALL_LOCATIONS
      ? ALL_LOCATIONS
      : (locations.find(
          (location) => location.locationId === filters.locationId,
        )?.originalName ?? ALL_LOCATIONS);

  return {
    franchise: filters.franchise,
    location: selectedLocation,
  };
}

export async function listNotifications(
  ctx: UserContext,
  args: ListNotificationsArgs = {},
): Promise<PageResult<Notification>> {
  const page = args.page ?? 1;
  const pageSize = clampNotificationPageSize(
    args.pageSize ?? NOTIFICATION_PAGE_SIZE,
  );

  const { data, error } = await supabase.rpc("get_notifications_with_details", {
    p_account_id: ctx.accountId,
    p_franchise_filter:
      args.franchise && args.franchise !== ALL_FRANCHISES
        ? args.franchise
        : null,
    p_location_filter:
      args.location && args.location !== ALL_LOCATIONS ? args.location : null,
    p_is_admin: args.isAdmin ?? false,
    p_page: page,
    p_page_size: pageSize,
    p_expiry_days: args.expiryDays ?? NOTIFICATION_EXPIRY_DAYS,
    p_timezone:
      args.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  if (error) throw error;

  const rows = parseNotifications(data);
  return { data: rows, count: rows[0]?.totalCount ?? 0 };
}

export async function markNotificationHandled(id: string) {
  const { error } = await supabase
    .from("notifications")
    .update({
      status: HANDLED_STATUS,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw error;
}

export function parseNotifications(data: unknown): Notification[] {
  return notificationRowsSchema.parse(data ?? []).map(mapNotification);
}
