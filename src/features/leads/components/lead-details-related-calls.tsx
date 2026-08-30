import { router } from "expo-router";
import { Fragment, memo } from "react";
import { ActivityIndicator, Pressable, ScrollView } from "react-native";

import { CardRow } from "@/components/card-row";
import { CardSeparator } from "@/components/card-separator";
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

function LeadDetailsRelatedCallsListComponent({
  calls,
}: LeadDetailsRelatedCallsListProps) {
  return (
    <ScrollView>
      {calls.map((call, index) => (
        <Fragment key={call.id}>
          {index > 0 && <CardSeparator />}
          <Pressable
            className="active:bg-accent rounded-lg"
            onPress={() =>
              router.navigate({
                pathname: "/call/[id]",
                params: { id: call.id },
              })
            }
          >
            <CardRow
              label={call.label}
              content={call.dateLabel}
              contentContainerClassName="items-end"
            />
          </Pressable>
        </Fragment>
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
