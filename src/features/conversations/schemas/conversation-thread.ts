import { z } from "zod";

import { ConversationThread } from "@/types/api";

const rawRowSchema = z.record(z.string(), z.unknown());

export const conversationThreadRowsSchema = z.array(rawRowSchema);

export function mapConversationThread(
  row: Record<string, unknown>,
): ConversationThread {
  const leadId = row.lead_id ?? row.leadId;
  if (leadId == null || leadId === "") {
    throw new Error("Conversation is missing lead_id.");
  }

  const firstName = text(row.first_name ?? row.firstName);
  const lastName = text(row.last_name ?? row.lastName);
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || null;

  return {
    lead_id: String(leadId),
    from_number: text(row.from_number ?? row.fromNumber),
    to_number: text(row.to_number ?? row.toNumber),
    name:
      text(row.name) ??
      text(row.customer_name ?? row.customerName) ??
      text(row.lead_name ?? row.leadName) ??
      text(row.contact_name ?? row.contactName) ??
      fullName,
    email: text(row.email),
    disposition_current:
      text(row.disposition_current ?? row.dispositionCurrent) ??
      text(row.disposition) ??
      text(row.latest_disposition ?? row.latestDisposition),
    disposition_source: text(row.disposition_source ?? row.dispositionSource),
    source: text(row.source),
    campaign: text(row.campaign),
    lead_created_at: timestamp(
      row.lead_created_at ??
        row.leadCreatedAt ??
        row.last_message_time ??
        row.last_message_at ??
        row.message_time ??
        row.updated_at ??
        row.created_at,
    ),
    total_count:
      typeof row.total_count === "number"
        ? row.total_count
        : typeof row.totalCount === "number"
          ? row.totalCount
          : undefined,
  };
}

function text(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
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
