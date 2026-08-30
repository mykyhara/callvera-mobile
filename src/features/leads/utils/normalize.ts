import { formatCreatedAt } from "@/lib/utils";

import { getLead } from "../services/api";
import { LeadCall, LeadDetailsViewModel, LeadRow } from "../types";

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

export function formatRevenue(revenue: number | null): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(revenue ?? 0);
}

export function normalizeLeadCall(row: any): LeadCall {
  const label =
    row.call_type ?? (row.direction ? `${row.direction} call` : "Call");
  return {
    id: String(row.id),
    label,
    dateLabel: formatCreatedAt(row.call_time ?? null),
  };
}

type RawLead = Exclude<Awaited<ReturnType<typeof getLead>>, null>;
export function toLeadDetails(row: RawLead): LeadDetailsViewModel {
  const createdAtDate = row.created_at ? new Date(row.created_at) : null;

  const totalMessages = Array.isArray(row.message_count)
    ? row.message_count.reduce((acc, item) => acc + (item.count || 0), 0)
    : (row.message_count ?? null);

  return {
    id: row.id,
    name:
      row.name ||
      (row.first_name || row.last_name
        ? `${row.first_name || ""} ${row.last_name || ""}`.trim()
        : null),
    phone: row.phone || null,
    email: row.email || null,
    locationName:
      row.location_name || row.brand_locations?.location_name || null,
    disposition: row.disposition_current || null,
    dispositionSource: row.disposition_source || null,
    source: row.source || row.provider || null,
    campaign: row.campaign || null,
    summary: row.summary || null,
    revenue: row.revenue ?? null,
    callCounts: row.call_counts ?? null,
    createdAt: row.created_at || null,
    direction: row.direction || null,
    messageCount: totalMessages,
    isMasked: false,

    createdAtLabel: createdAtDate
      ? createdAtDate.toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "N/A",

    revenueLabel:
      row.revenue != null
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(row.revenue)
        : "$0.00",

    dispositionLabel: row.disposition_current
      ? row.disposition_current
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase())
      : "Unassigned",

    sourceLabel:
      [row.provider, row.campaign].filter(Boolean).join(" - ") ||
      row.source ||
      "Direct",
  };
}
