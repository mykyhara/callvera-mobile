import { createQueryKeys } from "@lukemorales/query-key-factory";

import { GlobalFilters, MaskedFallbackParams, UserContext } from "@/types/api";

import { CallsFilters } from "../types";
import { fetchCallsPageWithFallback, getCall } from "./api";

export const callsQueries = createQueryKeys("calls", {
  list: (
    ctx: UserContext,
    globalFilters: GlobalFilters,
    callsFilters: CallsFilters,
    maskedFallback: MaskedFallbackParams,
    pageSize: number,
  ) => ({
    queryKey: [ctx?.accountId ?? "", globalFilters, callsFilters, pageSize],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      fetchCallsPageWithFallback(
        ctx,
        globalFilters,
        callsFilters,
        maskedFallback,
        pageParam,
        pageSize,
      ),
  }),
  record: (callId: string) => ({
    queryKey: [callId],
    queryFn: async () => getCall(callId),
  }),
});
