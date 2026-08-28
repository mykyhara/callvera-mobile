import { ConversationThread } from "@/types/api";

export type ConversationsPage = {
  threads: ConversationThread[];
  page: number;
  pageSize: number;
  totalCount: number;
};
