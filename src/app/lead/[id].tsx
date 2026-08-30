import { useLocalSearchParams } from "expo-router";

import { ScreenHeader } from "@/components/screen-header";
import { ScreenTemplate } from "@/components/screen-template";
import LeadDetails from "@/features/leads/components/lead-details";
import { LeadDetailsNotFound } from "@/features/leads/components/lead-details-states";
import { useLeadDetails } from "@/features/leads/hooks/use-lead-details";

export default function LeadDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lead = useLeadDetails(id); // TODO: fix getting cached only leads

  return (
    <ScreenTemplate className="gap-y-4">
      <ScreenHeader title="Lead details" withBackButton />
      {lead ? <LeadDetails lead={lead} /> : <LeadDetailsNotFound />}
    </ScreenTemplate>
  );
}
