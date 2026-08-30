import { memo } from "react";
import { RefreshControl, ScrollView, View } from "react-native";

import { CallDetailsViewModel } from "../types";
import { CallDetailsHeader } from "./call-details-header";
import { CallDetailsNotes } from "./call-details-notes";
import { CallLead } from "./call-lead";
import { CallRecording } from "./call-recording";
import { CallSummary } from "./call-summary";

interface CallDetailsProps {
  call: CallDetailsViewModel;
  refreshing?: boolean;
  onRefresh?: () => void;
}

function CallDetails({
  call,
  refreshing = false,
  onRefresh,
}: CallDetailsProps) {
  return (
    <View className="flex-1">
      <CallDetailsHeader call={call} />

      <ScrollView
        className="grow"
        contentContainerClassName="gap-4 pt-4 pb-safe"
        showsVerticalScrollIndicator={false}
        refreshControl={
          onRefresh && (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          )
        }
      >
        <CallLead call={call} />

        <CallRecording call={call} />

        <CallSummary call={call} />

        <CallDetailsNotes callId={call.id} />
      </ScrollView>
    </View>
  );
}

const CallDetailsMemoized = memo(CallDetails);
export default CallDetailsMemoized;
