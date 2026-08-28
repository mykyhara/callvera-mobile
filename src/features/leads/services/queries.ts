import { createQueryKeys } from "@lukemorales/query-key-factory";

import { clampPageSize } from "@/constants/leads";
import { isAuthError } from "@/lib/utils";
import { GlobalFilters, LeadsFilters, UserContext } from "@/types/api";

import { LeadsPage } from "../types";
import { getLeadCalls, listLeads, listMaskedLeads } from "./api";
import {
  normalizeLead,
  normalizeLeadCall,
  normalizeMaskedLead,
} from "../utils/normalize";

export type MaskedFallbackParams = {
  franchiseOrNull: string | null;
  locationNameOrNull: string | null;
};

async function fetchLeadsPage(
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

export const leadsQueries = createQueryKeys("leads", {
  list: (
    ctx: UserContext,
    globalFilters: GlobalFilters,
    leadsFilters: LeadsFilters,
    maskedFallback: MaskedFallbackParams,
    pageSize: number,
  ) => ({
    queryKey: [ctx?.accountId ?? "", globalFilters, leadsFilters, pageSize],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      fetchLeadsPage(
        ctx,
        globalFilters,
        leadsFilters,
        maskedFallback,
        pageParam,
        pageSize,
      ),
  }),
  calls: (leadId: string) => ({
    queryKey: [leadId],
    queryFn: async () => {
      const rows = await getLeadCalls(leadId);
      return rows.map(normalizeLeadCall);
    },
  }),
});
