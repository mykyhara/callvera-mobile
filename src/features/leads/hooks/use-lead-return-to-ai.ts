import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { leadReturnToAI } from "../services/api";

export function useLeadReturnToAI(
  options?: Omit<
    UseMutationOptions<unknown, Error, { leadId: string }>,
    "mutationFn"
  >,
) {
  return useMutation({
    mutationFn: ({ leadId }) => leadReturnToAI(leadId),
    ...options,
  });
}
