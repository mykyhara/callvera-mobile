import { memo } from "react";
import { ScrollView, View } from "react-native";

import { LeadDetailsViewModel } from "../types";
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

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="gap-4 p-4 pb-8">
          <LeadSummary lead={lead} />

          <LeadDetailsRelatedCalls leadId={lead.id} />

          <LeadDetailsTags leadId={lead.id} />

          <LeadDetailsNotes leadId={lead.id} />
        </View>
      </ScrollView>
    </View>
  );
}

const LeadDetailsMemoized = memo(LeadDetails);
export default LeadDetailsMemoized;
