import { AudioPlayer } from "@/components/audio-player";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

import { CallDetailsViewModel } from "../types";

interface CallRecordingProps {
  call: CallDetailsViewModel;
}

const RECORDING_PLAYBACK_ENDPOINT_NOTE =
  "Recording playback must use the Callvera-provided protected recording endpoint.";

export function CallRecording({ call }: CallRecordingProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recording</CardTitle>
      </CardHeader>
      <CardContent>
        <AudioPlayer url={call.callRecordingUrl} disabled={true} />
        <Text variant="muted" className="mt-2 text-xs">
          {RECORDING_PLAYBACK_ENDPOINT_NOTE}
        </Text>
      </CardContent>
    </Card>
  );
}
