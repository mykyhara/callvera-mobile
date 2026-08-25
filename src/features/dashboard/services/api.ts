import { ALL_LOCATIONS } from "@/constants/filters";
import { supabase } from "@/lib/supabase";
import { GlobalFilters, LocationOption } from "@/types/api";

/** @deprecated temporary placeholder */
interface RpcResponse {
  total_leads: number | null;
  unqualified_leads: number | null;
  qualified_leads: number | null;
  total_calls: number | null;
  unreachable_leads: number | null;
  in_progress_leads: number | null;
  not_converted: number | null;
  converted: number | null;
  transfer_successful: number | null;
  transfer_unsuccessful: number | null;
}

export async function fetchDashboardMetrics(
  filters: GlobalFilters,
  locations: LocationOption[],
) {
  const franchises = [...new Set(locations.map((x) => x.franchise))];
  const locationIds = locations.map((x) => x.locationId);

  const { data: rawData, error } = await supabase
    .rpc("get_aggregated_dashboard_metrics", {
      p_franchise: filters.franchise,
      p_location_id:
        filters.locationId === ALL_LOCATIONS ? null : filters.locationId,
      p_location_ids: locationIds.length ? locationIds : null,
      p_franchises: franchises.length ? franchises : null,
      p_start_date: filters.startDate,
      p_end_date: filters.endDate,
    })
    .single();

  if (error) throw error;

  const data = rawData as RpcResponse; // TODO: remove this override when Database schema generated

  return {
    totalLeads: data.total_leads ?? 0,
    unqualifiedLeads: data.unqualified_leads ?? 0,
    qualifiedLeads: data.qualified_leads ?? 0,
    totalCalls: data.total_calls ?? 0,
    unreachableLeads: data.unreachable_leads ?? 0,
    inProgressLeads: data.in_progress_leads ?? 0,
    notConverted: data.not_converted ?? 0,
    converted: data.converted ?? 0,
    transferSuccessful: data.transfer_successful ?? 0,
    transferUnsuccessful: data.transfer_unsuccessful ?? 0,
  };
}
