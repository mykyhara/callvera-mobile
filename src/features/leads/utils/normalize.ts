import { LeadRow } from "../types";

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
    locationName:
      row.brand_locations?.location_name ?? row.location_name ?? null,
    disposition: row.disposition_current ?? null,
    source: row.source ?? null,
    campaign: row.campaign ?? null,
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
    locationName: row.location_name ?? null,
    disposition: row.disposition_current ?? null,
    source: row.source ?? null,
    campaign: row.campaign ?? null,
    createdAt: row.created_at ?? null,
    direction: row.direction ?? null,
    messageCount: null,
    isMasked: true,
  };
}
