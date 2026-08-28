import { memo, useCallback } from "react";
import { ScrollView, View } from "react-native";

import { useAuth } from "@/providers/auth-provider";

import { LeadDetailsViewModel } from "../types";
import { LeadDetailsHeader } from "./lead-details-header";
import { LeadDetailsNotes } from "./lead-details-notes";
import { LeadDetailsRelatedCalls } from "./lead-details-related-calls";
import { LeadDetailsTags } from "./lead-details-tags";
import { LeadSummary } from "./lead-summary";

interface LeadDetailsProps {
  lead: LeadDetailsViewModel;
}

const MOCK_RELATED_CALLS = [
  { id: "mock-call-1", label: "Inbound call", date: "2 days ago" },
  { id: "mock-call-2", label: "Follow-up call", date: "5 days ago" },
];
const MOCK_TAGS = ["Hot lead", "Follow up"];
const MOCK_NOTES = [
  { id: "mock-note-1", author: "System", text: "Awaiting notes API." },
];

function LeadDetails({ lead }: LeadDetailsProps) {
  const { userContext } = useAuth();
  const canManageNotesAndTags = !!userContext?.hasWriteAccess;

  // Not implemented yet — wire up once the notes API exists.
  const handleAddNote = useCallback(() => {}, []);

  // Not implemented yet — wire up once the tags API exists.
  const handleAddTag = useCallback(() => {}, []);

  return (
    <View className="flex-1">
      <LeadDetailsHeader lead={lead} />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="gap-4 p-4 pb-8">
          <LeadSummary lead={lead} />

          <LeadDetailsRelatedCalls calls={MOCK_RELATED_CALLS} />

          <LeadDetailsTags
            tags={MOCK_TAGS}
            canManageNotesAndTags={canManageNotesAndTags}
            onAddTag={handleAddTag}
          />

          <LeadDetailsNotes
            notes={MOCK_NOTES}
            canManageNotesAndTags={canManageNotesAndTags}
            onAddNote={handleAddNote}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const LeadDetailsMemoized = memo(LeadDetails);
export default LeadDetailsMemoized;
