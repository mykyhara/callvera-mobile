import { API_BASE_URL } from "@/constants/api";
import { ALL_LOCATIONS, Direction, DirectionType } from "@/constants/filters";
import { callMobileApi } from "@/lib/mobile-api";
import { supabase } from "@/lib/supabase";
import { clampPageSize, isAuthError } from "@/lib/utils";
import { GlobalFilters, MaskedFallbackParams, UserContext } from "@/types/api";

import { LeadsFilters, LeadsPage } from "../types";
import { normalizeLead, normalizeMaskedLead } from "../utils/normalize";

async function listLeads(
  ctx: UserContext,
  f: GlobalFilters,
  opts: {
    page?: number;
    pageSize?: number;
    search?: string;
    dispositions?: string[];
    campaigns?: string[];
    sources?: string[];
    providers?: string[];
  } = {},
) {
  const page = opts.page ?? 1,
    pageSize = opts.pageSize ?? 25;
  let q = supabase
    .from("leads")
    .select(
      "id,account_id,location_id,name,first_name,last_name,phone,email,brand_name," +
        "location_name,direction,disposition_current,disposition_source," +
        "sub_disposition_current,source,provider,campaign,summary,revenue,created_at," +
        "updated_at,call_counts,lead_action,human_handover," +
        "message_count:conversations(count),brand_locations(location_name)",
      { count: "exact" },
    )
    .eq("is_disabled", false)
    .eq("account_id", ctx.accountId);
  if (f.locationId !== ALL_LOCATIONS) q = q.eq("location_id", f.locationId);
  if (f.direction !== Direction.ALL) q = q.eq("direction", f.direction);
  if (f.startDate && f.endDate)
    q = q.gte("created_at", f.startDate).lte("created_at", f.endDate);
  if (opts.dispositions?.length)
    q = q.in("disposition_current", opts.dispositions);
  if (opts.campaigns?.length) q = q.in("campaign", opts.campaigns);
  if (opts.sources?.length) q = q.in("source", opts.sources);
  if (opts.providers?.length) q = q.in("provider", opts.providers);
  if (opts.search?.trim())
    q = q.or(
      `name.ilike.%${opts.search.trim()}%,phone.ilike.%${opts.search.trim()}%`,
    );
  const from = (page - 1) * pageSize;
  const { data, count, error } = await q
    .order("created_at", { ascending: false })
    .range(from, from + pageSize - 1);
  if (error) throw error;
  return { data: data ?? [], count: count ?? 0 };
}

async function listMaskedLeads({
  selectedFranchiseOrNull,
  selectedOriginalLocationNameOrNull,
  filters,
  page,
  pageSize,
}: {
  selectedFranchiseOrNull: string | null;
  selectedOriginalLocationNameOrNull: string | null;
  filters: Pick<GlobalFilters, "startDate" | "endDate">;
  page: number;
  pageSize: number;
}) {
  return supabase.rpc("get_masked_leads", {
    p_franchise: selectedFranchiseOrNull,
    p_location: selectedOriginalLocationNameOrNull,
    p_start_date: filters.startDate,
    p_end_date: filters.endDate,
    p_call_type: null,
    p_page: page,
    p_page_size: pageSize,
  });
}

interface MessageCount {
  count: number;
}

interface BrandLocations {
  location_name: string;
}

/** @deprecated temporary placeholder */
interface LeadRecord {
  id: string;
  account_id: string;
  location_id: number;
  name: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  brand_name: string;
  location_name: string;
  direction: DirectionType;
  disposition_current: string;
  disposition_source: string | null;
  sub_disposition_current: string | null;
  source: string;
  provider: string;
  campaign: string;
  summary: string | null;
  revenue: number;
  created_at: string;
  updated_at: string;
  call_counts: number;
  lead_action: string[];
  human_handover: boolean;
  message_count: MessageCount[];
  brand_locations: BrandLocations;
}

export async function getLead(leadId: string) {
  const { data, error } = await supabase
    .from("leads")
    .select(
      "id,account_id,location_id,name,first_name,last_name,phone,email,brand_name," +
        "location_name,direction,disposition_current,disposition_source," +
        "sub_disposition_current,source,provider,campaign,summary,revenue,created_at," +
        "updated_at,call_counts,lead_action,human_handover," +
        "message_count:conversations(count),brand_locations(location_name)",
    )
    .eq("id", leadId)
    .eq("is_disabled", false)
    .single();

  if (error) throw error;

  return data as unknown as LeadRecord | null;
}

export async function getLeadCalls(leadId: string) {
  const { data, error } = await supabase
    .from("calls")
    .select(
      "id,external_call_id,agent_id,call_time,call_duration,direction,call_type," +
        "disposition_current,customer_name,from_number,to_number,call_successful," +
        "call_recording_url,user_sentiment,call_summary,transcript,brand_name," +
        "requested_event_created_time,disconnection_reason",
    )
    .eq("lead_id", leadId)
    .eq("is_disabled", false)
    .order("call_time", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function fetchLeadsPageWithFallback(
  ctx: UserContext,
  globalFilters: GlobalFilters,
  leadsFilters: LeadsFilters,
  maskedFallback: MaskedFallbackParams,
  page: number,
  pageSize: number,
): Promise<LeadsPage> {
  const size = clampPageSize(pageSize);

  try {
    const { data, count } = await listLeads(ctx, globalFilters, {
      page,
      pageSize: size,
      search: leadsFilters.search,
      dispositions: leadsFilters.dispositions,
      sources: leadsFilters.sources,
      campaigns: leadsFilters.campaigns,
    });

    return {
      rows: data.map(normalizeLead),
      page,
      pageSize: size,
      totalCount: count,
      isMasked: false,
    };
  } catch (error) {
    if (!isAuthError(error)) throw error;

    const { data, error: maskedError } = await listMaskedLeads({
      selectedFranchiseOrNull: maskedFallback.franchiseOrNull,
      selectedOriginalLocationNameOrNull: maskedFallback.locationNameOrNull,
      filters: globalFilters,
      page,
      pageSize: size,
    });
    if (maskedError) throw maskedError;

    const rows = data ?? [];
    return {
      rows: rows.map(normalizeMaskedLead),
      page,
      pageSize: size,
      totalCount: rows[0]?.total_count ?? 0,
      isMasked: true,
    };
  }
}

/** mock adapter */
export function toggleLeadManualMode(
  leadId: string,
  payload: { enabled: boolean },
) {
  return callMobileApi(API_BASE_URL, `/v1/leads/${leadId}/manual-mode`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/** mock adapter */
export function addLeadMessage(leadId: string, payload: { message: string }) {
  return callMobileApi(API_BASE_URL, `/v1/leads/${leadId}/messages`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/** mock adapter */
export function leadReturnToAI(leadId: string) {
  return callMobileApi(API_BASE_URL, `/v1/leads/${leadId}/return-to-ai`, {
    method: "POST",
  });
}

type NotificationType = string;

/** mock adapter */
export function addLeadNotification(
  leadId: string,
  payload: { notificationType: NotificationType },
) {
  return callMobileApi(API_BASE_URL, `/v1/leads/${leadId}/notifications`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
