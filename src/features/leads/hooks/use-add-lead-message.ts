import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { addLeadMessage } from "../services/api";

export function useAddLeadMessage(
  options?: Omit<
    UseMutationOptions<
      unknown,
      Error,
      { leadId: string; payload: { message: string } }
    >,
    "mutationFn"
  >,
) {
  return useMutation({
    mutationFn: ({ leadId, payload }) => addLeadMessage(leadId, payload),
    ...options,
  });
}
