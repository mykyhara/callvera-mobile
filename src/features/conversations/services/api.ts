import { QueryClient } from "@tanstack/react-query";

import { ALL_FRANCHISES, ALL_LOCATIONS } from "@/constants/filters";
import { supabase } from "@/lib/supabase";
import {
  ConversationMessage,
  ConversationThread,
  GlobalFilters,
  LocationOption,
} from "@/types/api";

import {
  conversationMessageRowsSchema,
  mapConversationMessage,
} from "../schemas/conversation-message";
import {
  conversationThreadRowsSchema,
  mapConversationThread,
} from "../schemas/conversation-thread";
import { ConversationsPage } from "../types";

export const CONVERSATION_PAGE_SIZE = 25;

export type ListConversationsArgs = {
  franchises: string[] | null;
  locations: string[] | null;
  startDate: string | null;
  endDate: string | null;
  search?: string;
  page?: number;
  pageSize?: number;
};

export function getConversationFilterArgs(
  filters: GlobalFilters,
  locations: LocationOption[],
): Pick<
  ListConversationsArgs,
  "franchises" | "locations" | "startDate" | "endDate"
> {
  const selectedLocation =
    filters.locationId === ALL_LOCATIONS
      ? null
      : (locations.find(
          (location) => location.locationId === filters.locationId,
        )?.originalName ?? null);

  return {
    franchises:
      filters.franchise === ALL_FRANCHISES ? null : [filters.franchise],
    locations: selectedLocation ? [selectedLocation] : null,
    startDate: filters.startDate,
    endDate: filters.endDate,
  };
}

export async function listConversations(args: {
  franchises: string[] | null;
  locations: string[] | null;
  startDate: string | null;
  endDate: string | null;
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  const page = args.page ?? 1;
  const size = args.pageSize ?? CONVERSATION_PAGE_SIZE;
  const filters = {
    p_franchise: args.franchises,
    p_location: args.locations,
    p_start_date: args.startDate,
    p_end_date: args.endDate,
    p_search_term: args.search?.trim() || null,
  };

  const { data, error } =
    process.env.EXPO_PUBLIC_APP_ENV === "test"
      ? await supabase.rpc("get_masked_conversations", {
          ...filters,
          p_page: page,
          p_page_size: size,
        })
      : await supabase.rpc("get_unique_conversations", {
          ...filters,
          p_limit: size,
          p_offset: (page - 1) * size,
        });

  if (error) throw error;
  return data ?? [];
}

export function parseConversationThreads(data: unknown): ConversationThread[] {
  return conversationThreadRowsSchema.parse(data).map(mapConversationThread);
}

export async function listMessages(leadId: string) {
  const { data, error } = await supabase
    .from("conversations_view")
    .select(
      "lead_id,from_number,to_number,direction,message,message_time," +
        "created_at,conversation_status,disposition_source",
    )
    .eq("lead_id", leadId)
    .eq("conversation_disabled", false)
    .order("message_time", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export function parseConversationMessages(
  data: unknown,
): ConversationMessage[] {
  return conversationMessageRowsSchema.parse(data).map(mapConversationMessage);
}

export function getConversationThread(
  queryClient: QueryClient,
  leadId: string,
): ConversationThread | undefined {
  const cachedQueries = queryClient.getQueriesData<{
    pages: ConversationsPage[];
  }>({
    queryKey: ["conversations", "list"],
  });

  for (const [, data] of cachedQueries) {
    const thread = data?.pages
      ?.flatMap((page) => page.threads)
      .find((row) => String(row.lead_id) === leadId);
    if (thread) return thread;
  }

  return undefined;
}
