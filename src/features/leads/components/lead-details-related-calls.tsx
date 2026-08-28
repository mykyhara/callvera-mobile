import { memo } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

import { useLeadCalls } from "../hooks/use-lead-details";
import { LeadCall } from "../types";

interface LeadDetailsRelatedCallsProps {
  leadId: string;
}

interface LeadDetailsRelatedCallsListProps {
  calls: LeadCall[];
}

function LeadDetailsRelatedCallsListComponent(
  props: LeadDetailsRelatedCallsListProps,
) {
  return (
    <ScrollView className="flex-1">
      {props.calls.map((call, index) => (
        <View
          key={call.id}
          className={"border-border flex-row justify-between border-b py-2"}
        >
          <Text className="text-sm">{call.label}</Text>
          <Text variant="muted" className="text-sm">
            {call.dateLabel}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const LeadDetailsRelatedCallsList = memo(LeadDetailsRelatedCallsListComponent);

function LeadDetailsRelatedCallsComponent({
  leadId,
}: LeadDetailsRelatedCallsProps) {
  const { data: calls, isPending, isError } = useLeadCalls(leadId);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Related calls</CardTitle>
      </CardHeader>
      <CardContent className="h-18 justify-center">
        {isPending ? (
          <ActivityIndicator />
        ) : isError ? (
          <Text variant="muted" className="text-center text-sm">
            Failed to load calls.
          </Text>
        ) : calls.length === 0 ? (
          <Text variant="muted" className="text-center text-sm">
            No related calls.
          </Text>
        ) : (
          <LeadDetailsRelatedCallsList calls={calls} />
        )}
      </CardContent>
    </Card>
  );
}

export const LeadDetailsRelatedCalls = memo(LeadDetailsRelatedCallsComponent);
