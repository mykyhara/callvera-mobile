import { View } from "react-native";

import { Text, TextClassContext } from "@/components/ui/text";
import { Direction } from "@/constants/filters";
import { cn } from "@/lib/utils";
import { ConversationMessage } from "@/types/api";

interface ConversationMessageBubbleProps {
  message: ConversationMessage;
}

export function ConversationMessageBubble({
  message,
}: ConversationMessageBubbleProps) {
  const outbound = message.direction === Direction.OUTBOUND;
  const timestamp = formatMessageTime(
    message.message_time ?? message.created_at,
  );

  const bubble = (
    <View
      className={cn(
        "w-full flex-row",
        outbound ? "justify-end" : "justify-start",
      )}
    >
      <View
        accessibilityRole="text"
        accessibilityLabel={`${outbound ? "Outbound" : "Inbound"} message`}
        className={cn(
          "max-w-[80%] gap-1 rounded-2xl px-3 py-2",
          outbound ? "bg-primary rounded-br-sm" : "bg-muted rounded-bl-sm",
        )}
      >
        <Text>{message.message ?? "No message content"}</Text>
        {timestamp ? (
          <Text variant="muted" className="text-xs opacity-70">
            {timestamp}
          </Text>
        ) : null}
      </View>
    </View>
  );

  if (!outbound) return bubble;

  return (
    <TextClassContext.Provider value="text-primary-foreground">
      {bubble}
    </TextClassContext.Provider>
  );
}

function formatMessageTime(iso: string | null | undefined) {
  if (!iso) return null;

  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}
