import { LeadDetailsViewModel, LeadRow } from "../types";

function extractMessageCount(value: unknown): number | null {
  if (typeof value === "number") return value;
  if (Array.isArray(value) && typeof value[0]?.count === "number") {
    return value[0].count;
  }
  if (
    value &&
    typeof value === "object" &&
    typeof (value as { count?: unknown }).count === "number"
  ) {
    return (value as { count: number }).count;
  }
  return null;
}

export function normalizeLead(row: any): LeadRow {
  const fullName = [row.first_name, row.last_name].filter(Boolean).join(" ");
  return {
    id: String(row.id),
    name: row.name ?? (fullName || null),
    phone: row.phone ?? null,
    email: row.email ?? null,
    locationName:
      row.brand_locations?.location_name ?? row.location_name ?? null,
    disposition: row.disposition_current ?? null,
    dispositionSource: row.disposition_source ?? null,
    source: row.source ?? null,
    campaign: row.campaign ?? null,
    summary: row.summary ?? null,
    revenue: typeof row.revenue === "number" ? row.revenue : null,
    callCounts: typeof row.call_counts === "number" ? row.call_counts : null,
    createdAt: row.created_at ?? null,
    direction: row.direction ?? null,
    messageCount: extractMessageCount(row.message_count),
    isMasked: false,
  };
}

export function normalizeMaskedLead(row: any): LeadRow {
  return {
    id: String(row.id),
    name: row.name ?? null,
    phone: row.phone ?? null,
    email: row.email ?? null,
    locationName: row.location_name ?? null,
    disposition: row.disposition_current ?? null,
    dispositionSource: null,
    source: row.source ?? null,
    campaign: row.campaign ?? null,
    summary: row.summary ?? null,
    revenue: null,
    callCounts: typeof row.call_counts === "number" ? row.call_counts : null,
    createdAt: row.created_at ?? null,
    direction: row.direction ?? null,
    messageCount: null,
    isMasked: true,
  };
}

export function formatCreatedAt(createdAt: string | null): string {
  if (!createdAt) return "Unknown";
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return "Unknown";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function formatRevenue(revenue: number | null): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(revenue ?? 0);
}

export function toLeadDetails(row: LeadRow): LeadDetailsViewModel {
  return {
    ...row,
    createdAtLabel: formatCreatedAt(row.createdAt),
    revenueLabel: formatRevenue(row.revenue),
    dispositionLabel: row.disposition ?? "No disposition",
    sourceLabel: row.source ?? "Unknown source",
  };
}
