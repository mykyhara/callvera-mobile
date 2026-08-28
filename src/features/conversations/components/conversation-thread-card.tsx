import { Pressable } from "react-native";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { ConversationThread } from "@/types/api";

interface ConversationThreadCardProps {
  thread: ConversationThread;
  onPress: () => void;
}

export const ConversationThreadCard = ({
  thread,
  onPress,
}: ConversationThreadCardProps) => {
  const leadName = thread.name?.trim() || "Unnamed lead";
  const disposition = thread.disposition_current?.trim() || "No disposition";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open conversation with ${leadName}`}
      className="active:opacity-80"
      onPress={onPress}
    >
      <Card className="gap-2 py-4" pointerEvents="none">
        <CardHeader className="px-4">
          <CardTitle className="text-base">{leadName}</CardTitle>
        </CardHeader>
        <CardContent className="gap-1 px-4">
          <Text variant="muted">{disposition}</Text>
          <Text variant="muted">
            {formatThreadTimestamp(thread.lead_created_at)}
          </Text>
        </CardContent>
      </Card>
    </Pressable>
  );
};

function formatThreadTimestamp(iso: string | null | undefined) {
  if (!iso) return "No timestamp";

  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "No timestamp";

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}
