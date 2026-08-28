import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

const MANUAL_MESSAGING_PROXY_NOTE =
  "Manual messaging stays disabled until Callvera supplies a JWT-authenticated server proxy.";

export function ConversationMessageInput() {
  return (
    <View className="gap-2">
      <View className="flex-row items-center gap-2">
        <Input
          className="flex-1"
          editable={false}
          placeholder="Message"
          accessibilityLabel="Message"
          accessibilityHint={MANUAL_MESSAGING_PROXY_NOTE}
        />
        <Button
          disabled
          accessibilityState={{ disabled: true }}
          accessibilityLabel="Send message"
          accessibilityHint={MANUAL_MESSAGING_PROXY_NOTE}
        >
          <Text>Send</Text>
        </Button>
      </View>
      <Text variant="muted" className="text-xs">
        {MANUAL_MESSAGING_PROXY_NOTE}
      </Text>
    </View>
  );
}
