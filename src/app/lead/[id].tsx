import { useLocalSearchParams } from "expo-router";

import { ScreenHeader } from "@/components/screen-header";
import { ScreenTemplate } from "@/components/screen-template";
import LeadDetails from "@/features/leads/components/lead-details";
import {
  LeadDetailsLoading,
  LeadDetailsNotFound,
} from "@/features/leads/components/lead-details-states";
import { useLeadDetails } from "@/features/leads/hooks/use-lead-details";

export default function LeadDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: lead, isLoading } = useLeadDetails(id);

  return (
    <ScreenTemplate contentContainerClassName="gap-y-4 pb-0">
      <ScreenHeader title="Lead details" withBackButton />
      {isLoading ? (
        <LeadDetailsLoading />
      ) : lead ? (
        <LeadDetails lead={lead} />
      ) : (
        <LeadDetailsNotFound />
      )}
    </ScreenTemplate>
  );
}
