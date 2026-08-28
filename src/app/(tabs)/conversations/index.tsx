import { ScreenTemplate } from "@/components/screen-template";
import { ConversationsList } from "@/features/conversations/components/conversations-list";

export default function ConversationsListScreen() {
  return (
    <ScreenTemplate contentContainerClassName="flex-1">
      <ConversationsList />
    </ScreenTemplate>
  );
}
