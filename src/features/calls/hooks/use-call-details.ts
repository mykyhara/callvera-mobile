import { useQuery } from "@tanstack/react-query";

import { queries } from "@/lib/queries";

import { toCallDetails } from "../utils/normalize";

export const useCallDetails = (callId: string | undefined) => {
  return useQuery({
    ...queries.calls.details(callId!),
    select: (data) => (data ? toCallDetails(data) : null),
    enabled: !!callId,
  });
};
