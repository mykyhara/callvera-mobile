import { createQueryKeys } from "@lukemorales/query-key-factory";

import {
  CONVERSATION_PAGE_SIZE,
  ListConversationsArgs,
  listConversations,
  listMessages,
  parseConversationMessages,
  parseConversationThreads,
} from "./api";
import { ConversationsPage } from "../types";

async function fetchConversationsPage(
  args: Omit<ListConversationsArgs, "page">,
  page: number,
): Promise<ConversationsPage> {
  const pageSize = args.pageSize ?? CONVERSATION_PAGE_SIZE;
  const data = await listConversations({ ...args, page, pageSize });
  const threads = parseConversationThreads(data);

  return {
    threads,
    page,
    pageSize,
    totalCount: threads[0]?.total_count ?? 0,
  };
}

export const conversationQueries = createQueryKeys("conversations", {
  list: (args: Omit<ListConversationsArgs, "page">) => ({
    queryKey: [args],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      fetchConversationsPage(args, pageParam),
  }),
  messages: (leadId: string) => ({
    queryKey: [leadId],
    queryFn: async () => parseConversationMessages(await listMessages(leadId)),
  }),
});
