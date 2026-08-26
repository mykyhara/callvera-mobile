import { supabase } from "@/lib/supabase";
import { UserContext, GlobalFilters } from "@/types/api";

export async function listLeads(
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
  if (f.locationId !== "all-locations") q = q.eq("location_id", f.locationId);
  if (f.direction !== "all") q = q.eq("direction", f.direction);
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

export async function listMaskedLeads({
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
