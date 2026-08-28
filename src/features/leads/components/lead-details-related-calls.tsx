import { memo } from "react";
import { View } from "react-native";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

interface RelatedCall {
  id: string;
  label: string;
  date: string;
}

interface LeadDetailsRelatedCallsProps {
  calls: RelatedCall[];
}

function LeadDetailsRelatedCallsComponent({
  calls,
}: LeadDetailsRelatedCallsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Related calls</CardTitle>
      </CardHeader>
      <CardContent className="gap-2">
        {calls.map((call) => (
          <View key={call.id} className="flex-row justify-between">
            <Text className="text-sm">{call.label}</Text>
            <Text variant="muted" className="text-sm">
              {call.date}
            </Text>
          </View>
        ))}
      </CardContent>
    </Card>
  );
}

export const LeadDetailsRelatedCalls = memo(LeadDetailsRelatedCallsComponent);
