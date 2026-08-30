import { CallRow } from "../types";

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
