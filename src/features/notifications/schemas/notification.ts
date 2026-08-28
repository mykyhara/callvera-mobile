import { z } from "zod";

import { Notification } from "../types";

const rawRowSchema = z.record(z.string(), z.unknown());

export const notificationRowsSchema = z.array(rawRowSchema);

export function mapNotification(row: Record<string, unknown>): Notification {
  const id = row.id;
  if (id == null || id === "") {
    throw new Error("Notification is missing id.");
  }

  return {
    id: String(id),
    userId: text(row.user_id ?? row.userId),
    accountId: text(row.account_id ?? row.accountId),
    locationName: text(row.location_name ?? row.locationName),
    brandName: text(row.brand_name ?? row.brandName),
    notificationType: text(row.notification_type ?? row.notificationType),
    objectType: text(row.object_type ?? row.objectType),
    objectId: idValue(row.object_id ?? row.objectId),
    actionRequired: booleanValue(row.action_required ?? row.actionRequired),
    status: text(row.status),
    createdAt: timestamp(row.created_at ?? row.createdAt),
    updatedAt: timestamp(row.updated_at ?? row.updatedAt),
    contactName: text(row.contact_name ?? row.contactName),
    contactPhone: text(row.contact_phone ?? row.contactPhone),
    isAdmin: booleanValue(row.is_admin ?? row.isAdmin),
    totalCount: numberValue(row.total_count ?? row.totalCount),
  };
}

function text(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

function idValue(value: unknown): string | null {
  if (value == null || value === "") return null;
  return String(value);
}

function booleanValue(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    return normalized === "true" || normalized === "1";
  }
  return false;
}

function numberValue(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : undefined;
}

function timestamp(value: unknown): string | null {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString();
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    const ms = value > 0 && value < 1e12 ? value * 1000 : value;
    const date = new Date(ms);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  }

  if (typeof value === "string" && value.trim()) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : value;
  }

  return null;
}
