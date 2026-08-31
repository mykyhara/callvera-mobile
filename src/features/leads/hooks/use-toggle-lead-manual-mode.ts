import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { toggleLeadManualMode } from "../services/api";

export function useToggleLeadManualMode(
  options?: Omit<
    UseMutationOptions<
      unknown,
      Error,
      { leadId: string; payload: { enabled: boolean } }
    >,
    "mutationFn"
  >,
) {
  return useMutation({
    mutationFn: ({ leadId, payload }) => toggleLeadManualMode(leadId, payload),
    ...options,
  });
}
