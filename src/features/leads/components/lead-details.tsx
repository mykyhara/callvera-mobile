import { memo } from "react";
import { ScrollView, View } from "react-native";

import { LeadDetailsViewModel } from "../types";
import { LeadActionsBar } from "./lead-actions-bar";
import { LeadDetailsHeader } from "./lead-details-header";
import { LeadDetailsNotes } from "./lead-details-notes";
import { LeadDetailsRelatedCalls } from "./lead-details-related-calls";
import { LeadDetailsTags } from "./lead-details-tags";
import { LeadSummary } from "./lead-summary";

interface LeadDetailsProps {
  lead: LeadDetailsViewModel;
}

function LeadDetails({ lead }: LeadDetailsProps) {
  return (
    <View className="flex-1">
      <LeadDetailsHeader lead={lead} />

      <ScrollView
        contentContainerClassName="gap-4 pt-4 pb-safe"
        showsVerticalScrollIndicator={false}
      >
        <LeadActionsBar leadId={lead.id} disabled />

        <LeadSummary lead={lead} />

        <LeadDetailsRelatedCalls leadId={lead.id} />

        <LeadDetailsTags leadId={lead.id} />

        <LeadDetailsNotes leadId={lead.id} />
      </ScrollView>
    </View>
  );
}

const LeadDetailsMemoized = memo(LeadDetails);
export default LeadDetailsMemoized;
