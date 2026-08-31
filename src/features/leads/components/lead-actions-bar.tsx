import { useState } from "react";
import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

import { useAddLeadMessage } from "../hooks/use-add-lead-message";
import { useAddLeadNotification } from "../hooks/use-add-lead-notification";
import { useLeadReturnToAI } from "../hooks/use-lead-return-to-ai";
import { useToggleLeadManualMode } from "../hooks/use-toggle-lead-manual-mode";

interface LeadActionsBarProps {
  leadId: string;
  isManualMode?: boolean;
  disabled?: boolean;
}

const LEAD_ENDPOINTS_NOTE =
  "Lead actions must use the Callvera-provided protected endpoints.";

export function LeadActionsBar({
  leadId,
  isManualMode = false,
  disabled: allDisabled = false,
}: LeadActionsBarProps) {
  const [messageText, setMessageText] = useState("");

  const { mutate: addMessage, isPending: isAddingMessage } =
    useAddLeadMessage();
  const { mutate: addNotification, isPending: isAddingNotification } =
    useAddLeadNotification();
  const { mutate: toggleManualMode, isPending: isTogglingManual } =
    useToggleLeadManualMode();
  const { mutate: returnToAI, isPending: isReturningToAI } =
    useLeadReturnToAI();

  const handleAddMessage = () => {
    if (!messageText.trim()) return;
    addMessage(
      { leadId, payload: { message: messageText } },
      { onSuccess: () => setMessageText("") },
    );
  };

  const handleAddNotification = (type: string) => {
    addNotification({ leadId, payload: { notificationType: type } });
  };

  const handleToggleManualMode = () => {
    toggleManualMode({ leadId, payload: { enabled: !isManualMode } });
  };

  const handleReturnToAI = () => {
    returnToAI({ leadId });
  };

  return (
    <View className="flex-col gap-y-2">
      <View className="flex-row items-center gap-2">
        <Input
          className="flex-1"
          editable={!allDisabled}
          placeholder="Message"
        />
        <Button
          onPress={handleAddMessage}
          disabled={isAddingMessage || !messageText.trim()}
        >
          <Text>Send</Text>
        </Button>
      </View>

      <View className="flex-row flex-wrap gap-2">
        <Button
          onPress={handleToggleManualMode}
          disabled={allDisabled || isTogglingManual}
        >
          <Text>
            {isManualMode ? "Disable Manual Mode" : "Enable Manual Mode"}
          </Text>
        </Button>

        <Button
          onPress={handleReturnToAI}
          disabled={allDisabled || isReturningToAI}
        >
          <Text>{isReturningToAI ? "Returning..." : "Return to AI"}</Text>
        </Button>

        <Button
          onPress={() => handleAddNotification("FOLLOW_UP")}
          disabled={allDisabled || isAddingNotification}
        >
          <Text>Add Notification</Text>
        </Button>
      </View>

      {allDisabled && (
        <Text variant="muted" className="text-xs">
          {LEAD_ENDPOINTS_NOTE}
        </Text>
      )}
    </View>
  );
}
