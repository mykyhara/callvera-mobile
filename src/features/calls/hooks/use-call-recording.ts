import { useQuery } from "@tanstack/react-query";

import { queries } from "@/lib/queries";

export const useCallRecording = (callId: string | undefined) => {
  return useQuery({
    ...queries.calls.recording(callId!),
    enabled: !!callId,
  });
};
