import { useQuery } from "@tanstack/react-query";

import { queries } from "@/lib/queries";
import { isNotAcceptableError } from "@/lib/utils";

import { toLeadDetails } from "../utils/normalize";

export const useLeadDetails = (leadId: string | undefined) => {
  return useQuery({
    ...queries.leads.details(leadId!),
    select: (data) => (data ? toLeadDetails(data) : null),
    enabled: !!leadId,
    retry: (failureCount, error) =>
      !isNotAcceptableError(error) && failureCount < 2,
  });
};

export function useLeadCalls(leadId: string | undefined) {
  return useQuery({
    ...queries.leads.calls(leadId!),
    enabled: !!leadId,
  });
}
