import { useQuery } from "@tanstack/react-query";

import { queries } from "@/lib/queries";

import { toLeadDetails } from "../utils/normalize";

export const useLeadDetails = (leadId: string | undefined) => {
  return useQuery({
    ...queries.leads.details(leadId!),
    select: (data) => (data ? toLeadDetails(data) : null),
    enabled: !!leadId,
  });
};

export function useLeadCalls(leadId: string | undefined) {
  return useQuery({
    ...queries.leads.calls(leadId!),
    enabled: !!leadId,
  });
}
