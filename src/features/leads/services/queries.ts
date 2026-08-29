import { createQueryKeys } from "@lukemorales/query-key-factory";

import { GlobalFilters, MaskedFallbackParams, UserContext } from "@/types/api";

import { LeadsFilters } from "../types";
import { fetchLeadsPageWithFallback, getLeadCalls } from "./api";
import { normalizeLeadCall } from "../utils/normalize";

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
      fetchLeadsPageWithFallback(
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
