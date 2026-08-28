import { formatCreatedAt } from "@/lib/utils";

import { Notification } from "../types";

export const HANDLED_STATUS = "Handled";

export function isNotificationHandled(status: string | null | undefined) {
  return (status ?? "").trim().toLowerCase() === HANDLED_STATUS.toLowerCase();
}

export function formatNotificationDate(iso: string | null | undefined) {
  return formatCreatedAt(iso ?? null);
}

export function getNotificationContactLabel(notification: Notification) {
  return notification.contactName?.trim() || "Unknown contact";
}
