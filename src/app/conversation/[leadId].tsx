import { useQueryClient } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";

import { ScreenTemplate } from "@/components/screen-template";
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
      <Stack.Screen
        options={{ title, headerBackButtonDisplayMode: "minimal" }}
      />
      <ScreenTemplate
        safeArea={false}
        contentContainerClassName="flex-1 px-4 pt-0 pb-2"
      >
        <ConversationTimeline leadId={leadId} />
      </ScreenTemplate>
    </>
  );
}
