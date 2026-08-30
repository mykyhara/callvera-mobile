import { router } from "expo-router";

import { CardRow } from "@/components/card-row";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

import { CallDetailsViewModel } from "../types";

interface CallSummaryProps {
  call: CallDetailsViewModel;
}

export function CallLead({ call }: CallSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead</CardTitle>
      </CardHeader>
      <CardContent className="gap-y-1 px-4">
        <CardRow label="Source" content={call.leadSource || "Unknown"} />

        <Button
          variant="secondary"
          onPress={() =>
            router.navigate({
              pathname: "/lead/[id]",
              params: { id: String(call.leadId) },
            })
          }
        >
          <Text>Open Details</Text>
        </Button>
      </CardContent>
    </Card>
  );
}
