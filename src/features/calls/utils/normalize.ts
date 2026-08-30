import { getCall } from "../services/api";
import { CallDetailsViewModel, CallRow } from "../types";

export function normalizeCall(row: any): CallRow {
  return {
    id: String(row.id),
    callTime: row.call_time,
    fromNumber: row.from_number,
    toNumber: row.to_number,
    customerName: row.customer_name,
    callDuration: row.call_duration,
    dispositionCurrent: row.disposition_current,
    brandName: row.brand_name,
    locationName: row.location_name,
    direction: row.direction,
    callSummary: row.call_summary,
    transcript: row.transcript,
    totalCount: row.total_count ?? 0,
    isMasked: false,
  };
}

export function normalizeMaskedCall(row: any): CallRow {
  return {
    id: String(row.id),
    callTime: row.call_time,
    fromNumber: row.from_number,
    toNumber: row.to_number,
    customerName: row.customer_name,
    callDuration: row.call_duration,
    dispositionCurrent: row.disposition_current,
    brandName: row.brand_name,
    locationName: row.location_name,
    direction: row.direction,
    callSummary: row.call_summary,
    transcript: row.transcript,
    totalCount: row.total_count ?? 0,
    isMasked: true,
  };
}

type RawCall = Exclude<Awaited<ReturnType<typeof getCall>>, null>;
export function toCallDetails(row: RawCall): CallDetailsViewModel {
  return {
    id: row.id,
    locationId: row.location_id,
    callTime: row.call_time,
    callDuration: row.call_duration,
    direction: row.direction,
    callType: row.call_type,
    dispositionCurrent: row.disposition_current,
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    fromNumber: row.from_number,
    toNumber: row.to_number,
    callSuccessful: row.call_successful,
    callRecordingUrl: row.call_recording_url,
    userSentiment: row.user_sentiment,
    callSummary: row.call_summary,
    transcript: row.transcript,
    brandName: row.brand_name,
    locationName: row.location_name,
    campaign: row.campaign,
    leadSource: row.lead_source,
    leadId: row.lead_id,
    disconnectionReason: row.disconnection_reason,
  };
}
