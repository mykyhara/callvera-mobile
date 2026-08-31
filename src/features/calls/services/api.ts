import { isAuthError } from "@supabase/supabase-js";

import { API_BASE_URL } from "@/constants/api";
import { ALL_LOCATIONS, Direction, DirectionType } from "@/constants/filters";
import { callMobileApi } from "@/lib/mobile-api";
import { supabase } from "@/lib/supabase";
import { clampPageSize } from "@/lib/utils";
import { GlobalFilters, MaskedFallbackParams, UserContext } from "@/types/api";

import { CallsFilters, CallsPage } from "../types";
import { normalizeCall, normalizeMaskedCall } from "../utils/normalize";

async function listCalls(
  ctx: UserContext,
  f: GlobalFilters,
  page = 1,
  pageSize = 25,
  search = "",
) {
  let q = supabase
    .from("calls")
    .select(
      "id,account_id,location_id,call_time,call_duration,direction,call_type," +
        "disposition_current,customer_name,customer_email,from_number,to_number," +
        "call_successful,call_recording_url,user_sentiment,call_summary,transcript," +
        "brand_name,location_name,campaign,lead_source,lead_id,disconnection_reason," +
        "brand_locations(location_name)",
      { count: "exact" },
    )
    .eq("is_disabled", false)
    .eq("account_id", ctx.accountId);

  if (f.locationId !== ALL_LOCATIONS) q = q.eq("location_id", f.locationId);
  if (f.direction !== Direction.ALL) q = q.eq("direction", f.direction);
  if (f.startDate && f.endDate)
    q = q.gte("call_time", f.startDate).lte("call_time", f.endDate);
  if (search.trim())
    q = q.or(
      `customer_name.ilike.%${search.trim()}%,from_number.ilike.%${search.trim()}%,to_number.ilike.%${search.trim()}%`,
    );

  const from = (page - 1) * pageSize;

  const { data, count, error } = await q
    .order("call_time", { ascending: false })
    .range(from, from + pageSize - 1);

  if (error) throw error;

  return { data: data ?? [], count: count ?? 0 };
}

async function listMaskedCalls(
  filters: GlobalFilters,
  maskedFallbackParams: MaskedFallbackParams,
  page = 1,
  pageSize = 25,
) {
  return supabase.rpc("get_masked_calls", {
    p_franchise: maskedFallbackParams.franchiseOrNull,
    p_location: maskedFallbackParams.locationNameOrNull,
    p_start_date: filters.startDate,
    p_end_date: filters.endDate,
    p_direction: filters.direction === Direction.ALL ? null : filters.direction,
    p_page: page,
    p_page_size: pageSize,
  });
}

/** @deprecated temporary placeholder */
export interface CallRecord {
  id: string;
  location_id: number;
  call_time: string;
  call_duration: number;
  direction: DirectionType;
  call_type: string;
  disposition_current: string;
  customer_name: string;
  customer_email: string;
  from_number: string;
  to_number: string;
  call_successful: boolean;
  call_recording_url: string;
  user_sentiment: string;
  call_summary: string;
  transcript: string;
  brand_name: string;
  location_name: string;
  campaign: string;
  lead_source: string;
  lead_id: string;
  disconnection_reason: string;
}

export async function getCall(callId: string) {
  const { data, error } = await supabase
    .from("calls")
    .select(
      "id,location_id,call_time,call_duration,direction,call_type," +
        "disposition_current,customer_name,customer_email,from_number,to_number," +
        "call_successful,call_recording_url,user_sentiment,call_summary,transcript," +
        "brand_name,location_name,campaign,lead_source,lead_id,disconnection_reason",
    )
    .eq("id", callId)
    .eq("is_disabled", false)
    .single();

  if (error) throw error;

  return data as unknown as CallRecord | null;
}

export async function fetchCallsPageWithFallback(
  userContext: UserContext,
  globalFilters: GlobalFilters,
  callsFilters: CallsFilters,
  maskedFallback: MaskedFallbackParams,
  page: number,
  pageSize: number,
): Promise<CallsPage> {
  const size = clampPageSize(pageSize);

  try {
    const { data, count } = await listCalls(
      userContext,
      globalFilters,
      page,
      size,
      callsFilters.search,
    );

    return {
      rows: data.map(normalizeCall),
      page,
      pageSize: size,
      totalCount: count,
      isMasked: false,
    };
  } catch (error) {
    if (!isAuthError(error)) throw error;

    const { data, error: maskedError } = await listMaskedCalls(
      globalFilters,
      maskedFallback,
      page,
      size,
    );
    if (maskedError) throw maskedError;

    const rows = data ?? [];
    return {
      rows: rows.map(normalizeMaskedCall),
      page,
      pageSize: size,
      totalCount: rows[0]?.total_count ?? 0,
      isMasked: true,
    };
  }
}

/** mock adapter */
export function getCallRecording(callId: string) {
  return callMobileApi(API_BASE_URL, `/v1/calls/${callId}/recording`);
}
