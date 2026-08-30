import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";

import { ScreenHeader } from "@/components/screen-header";
import { ScreenSeparator } from "@/components/screen-separator";
import { ScreenTemplate } from "@/components/screen-template";
import { ConversationMessageInput } from "@/features/conversations/components/conversation-message-input";
import { ConversationTimeline } from "@/features/conversations/components/conversation-timeline";
import { getConversationThread } from "@/features/conversations/services/api";

export default function ConversationScreen() {
  const { leadId, name } = useLocalSearchParams<{
    leadId: string;
    name?: string;
  }>();
  const queryClient = useQueryClient();

  const title = useMemo(() => {
    const fromParams = typeof name === "string" ? name.trim() : "";
    if (fromParams) return fromParams;
    if (!leadId) return "Conversation";
    return (
      getConversationThread(queryClient, leadId)?.name?.trim() || "Conversation"
    );
  }, [leadId, name, queryClient]);

  return (
    <>
      <ScreenTemplate contentContainerClassName="gap-y-4 pb-safe">
        <ScreenHeader title={title} withBackButton />
        <ScreenSeparator className="-mb-4" />
        <ConversationTimeline leadId={leadId} />
        <ScreenSeparator className="-mt-4" />
        <ConversationMessageInput />
      </ScreenTemplate>
    </>
  );
}
