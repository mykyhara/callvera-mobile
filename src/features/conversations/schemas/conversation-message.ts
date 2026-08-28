import { z } from "zod";

import { ConversationMessage } from "@/types/api";

const rawRowSchema = z.record(z.string(), z.unknown());

export const conversationMessageRowsSchema = z.array(rawRowSchema);

export function mapConversationMessage(
  row: Record<string, unknown>,
): ConversationMessage {
  const leadId = row.lead_id ?? row.leadId;

  return {
    lead_id: leadId == null ? "" : String(leadId),
    from_number: text(row.from_number ?? row.fromNumber),
    to_number: text(row.to_number ?? row.toNumber),
    direction: text(row.direction)?.toLowerCase() ?? null,
    message: text(row.message),
    message_time: timestamp(
      row.message_time ?? row.messageTime ?? row.created_at ?? row.createdAt,
    ),
    created_at: timestamp(row.created_at ?? row.createdAt),
    conversation_status: text(
      row.conversation_status ?? row.conversationStatus,
    ),
    disposition_source: text(row.disposition_source ?? row.dispositionSource),
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
