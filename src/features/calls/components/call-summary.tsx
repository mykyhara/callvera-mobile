import { CardRow } from "@/components/card-row";
import { CardSeparator } from "@/components/card-separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { formatCreatedAt, formatDuration } from "@/lib/utils";

import { CallDetailsViewModel } from "../types";

interface CallSummaryProps {
  call: CallDetailsViewModel;
}

export function CallSummary({ call }: CallSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent className="gap-y-1 px-4">
        <CardRow label="From" content={call.fromNumber} />
        <CardSeparator />
        <CardRow label="To" content={call.toNumber} />
        <CardSeparator />
        <CardRow
          label="Direction"
          content={
            <Badge variant="default">
              <Text>{call.direction.toUpperCase()}</Text>
            </Badge>
          }
        />
        <CardSeparator />
        <CardRow label="Call Time" content={formatCreatedAt(call.callTime)} />
        <CardSeparator />
        <CardRow label="Duration" content={formatDuration(call.callDuration)} />
        <CardSeparator />
        <CardRow
          label="Call Type"
          content={
            <Badge variant="default">
              <Text>{call.callType.toUpperCase().replaceAll("_", " ")}</Text>
            </Badge>
          }
        />
        <CardSeparator />
        <CardRow
          label="Successfull"
          content={call.callSuccessful ? "Yes" : "No"}
        />
        <CardSeparator />
        <CardRow
          label="User sentiment"
          content={
            <Badge variant="default">
              <Text>
                {call.userSentiment.toUpperCase().replaceAll("_", " ")}
              </Text>
            </Badge>
          }
        />
      </CardContent>
    </Card>
  );
}
