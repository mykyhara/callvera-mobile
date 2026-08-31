import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { addLeadNotification } from "../services/api";

export function useAddLeadNotification(
  options?: Omit<
    UseMutationOptions<
      unknown,
      Error,
      { leadId: string; payload: { notificationType: string } }
    >,
    "mutationFn"
  >,
) {
  return useMutation({
    mutationFn: ({ leadId, payload }) => addLeadNotification(leadId, payload),
    ...options,
  });
}
