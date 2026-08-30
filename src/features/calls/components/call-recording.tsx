import { CardRow } from "@/components/card-row";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CallDetailsViewModel } from "../types";

interface CallRecordingProps {
  call: CallDetailsViewModel;
}

export function CallRecording({ call }: CallRecordingProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recording</CardTitle>
      </CardHeader>
      <CardContent className="gap-y-1 px-4">
        {/* TODO: implement Audio Player */}
        <CardRow label="URL" content={call.callRecordingUrl} />
      </CardContent>
    </Card>
  );
}
