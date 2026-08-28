import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { queries } from "@/lib/queries";

import { getLeadDetails } from "../services/api";
import { LeadDetailsViewModel } from "../types";
import { toLeadDetails } from "../utils/normalize";

export function useLeadDetails(
  id: string | undefined,
): LeadDetailsViewModel | undefined {
  const queryClient = useQueryClient();

  return useMemo(() => {
    if (!id) return undefined;

    const row = getLeadDetails(queryClient, id);
    if (!row) return undefined;

    return toLeadDetails(row);
  }, [id, queryClient]);
}

export function useLeadCalls(leadId: string) {
  return useQuery({
    ...queries.leads.calls(leadId),
    enabled: !!leadId,
  });
}
