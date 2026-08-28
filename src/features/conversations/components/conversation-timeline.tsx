import { useMemo } from "react";
import { FlatList, RefreshControl, View } from "react-native";

import { ErrorText } from "@/components/error-text";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import { cn, isAuthError } from "@/lib/utils";
import { ConversationMessage } from "@/types/api";

import { ConversationMessageBubble } from "./conversation-message-bubble";
import { useConversationMessagesQuery } from "../hooks/use-conversation-queries";

interface ConversationTimelineProps {
  leadId?: string;
}

export function ConversationTimeline({ leadId }: ConversationTimelineProps) {
  const {
    data: messages,
    error,
    isPending,
    isRefetching,
    refetch,
  } = useConversationMessagesQuery(leadId);

  const timeline = useMemo(
    () => (messages ? [...messages].reverse() : []),
    [messages],
  );
  const inverted = timeline.length > 0;

  if (!leadId) {
    return (
      <View className="flex-1 items-center justify-center p-6">
        <Text variant="muted" className="text-center">
          Unable to load this conversation.
        </Text>
      </View>
    );
  }

  if (isPending) {
    return <ConversationTimelineSkeleton />;
  }

  if (error && !messages) {
    return (
      <View className="flex-1 items-center justify-center gap-3 p-6">
        <ErrorText className="text-center">
          {isAuthError(error)
            ? "You do not have access to this content."
            : "Unable to load messages."}
        </ErrorText>
        <Button variant="outline" onPress={() => refetch()}>
          <Text>Retry</Text>
        </Button>
      </View>
    );
  }

  return (
    <FlatList
      inverted={inverted}
      style={{ flex: 1 }}
      data={timeline}
      keyExtractor={getMessageKey}
      renderItem={renderMessage}
      ItemSeparatorComponent={MessageSeparator}
      contentContainerClassName="grow pt-2"
      keyboardShouldPersistTaps="handled"
      refreshControl={
        <RefreshControl
          refreshing={isRefetching && !isPending}
          onRefresh={() => {
            void refetch();
          }}
        />
      }
      ListEmptyComponent={
        <View className="py-12">
          <Text variant="muted" className="text-center">
            No messages in this conversation.
          </Text>
        </View>
      }
    />
  );
}

const getMessageKey = (item: ConversationMessage, index: number) =>
  [item.lead_id, item.direction, item.message_time, item.message, index].join(
    "-",
  );

const renderMessage = ({ item }: { item: ConversationMessage }) => (
  <ConversationMessageBubble message={item} />
);

const MessageSeparator = () => <View className="h-2" />;

const SKELETON_BUBBLES = [
  { align: "start", width: "w-2/3" },
  { align: "end", width: "w-1/2" },
  { align: "start", width: "w-3/4" },
  { align: "end", width: "w-2/5" },
  { align: "start", width: "w-1/2" },
] as const;

function ConversationTimelineSkeleton() {
  return (
    <View className="flex-1 gap-2">
      {SKELETON_BUBBLES.map((bubble, index) => (
        <View
          key={index}
          className={cn(
            "w-full flex-row",
            bubble.align === "end" ? "justify-end" : "justify-start",
          )}
        >
          <Skeleton className={cn("h-16 rounded-2xl", bubble.width)} />
        </View>
      ))}
    </View>
  );
}
