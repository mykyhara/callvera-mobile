import { View } from "react-native";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

import { LeadDetailsViewModel } from "../types";

interface LeadSummaryProps {
  lead: LeadDetailsViewModel;
}

export function LeadSummary({ lead }: LeadSummaryProps) {
  return (
    <View className="gap-4">
      <View className="flex-row flex-wrap gap-2">
        {lead.disposition && (
          <Badge>
            <Text>{lead.disposition}</Text>
          </Badge>
        )}
        {lead.source && (
          <Badge variant="secondary">
            <Text>{lead.source}</Text>
          </Badge>
        )}
      </View>

      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Text variant="muted">{lead.summary ?? "No summary available."}</Text>
        </CardContent>
      </Card>
    </View>
  );
}
