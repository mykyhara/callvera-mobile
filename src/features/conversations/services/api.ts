import { ALL_FRANCHISES, ALL_LOCATIONS } from "@/constants/filters";
import { supabase } from "@/lib/supabase";
import { ConversationThread, GlobalFilters, LocationOption } from "@/types/api";

import {
  conversationThreadRowsSchema,
  mapConversationThread,
} from "../schemas/conversation-thread";

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
