import { useLocalSearchParams } from "expo-router";

import { ScreenTemplate } from "@/components/screen-template";
import LeadDetails from "@/features/leads/components/lead-details";
import { LeadDetailsNotFound } from "@/features/leads/components/lead-details-states";
import { useLeadDetails } from "@/features/leads/hooks/use-lead-details";

export default function LeadDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lead = useLeadDetails(id);

  return (
    <ScreenTemplate contentContainerClassName="flex-1 pt-0">
      {lead ? <LeadDetails lead={lead} /> : <LeadDetailsNotFound />}
    </ScreenTemplate>
  );
}
