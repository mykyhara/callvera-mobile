import { ALL_LOCATIONS, DirectionType } from "@/constants/filters";

export type UserContext = {
  authUserId: string;
  userId: string;
  accountId: string;
  name: string | null;
  email: string;
  role: string | null;
  hasWriteAccess: boolean;
};

export type LocationOption = {
  configId: string; // accounts_agent_config.id (UUID)
  locationId: number; // business location ID used by calls/leads
  franchise: string;
  name: string;
  originalName: string;
};

export type GlobalFilters = {
  franchise: string; // 'all-franchises' or an exact name
  locationId: number | typeof ALL_LOCATIONS;
  direction: DirectionType;
  startDate: string | null;
  endDate: string | null;
};

export type PageResult<T> = { data: T[]; count: number };

export interface MaskedFallbackParams {
  franchiseOrNull: string | null;
  locationNameOrNull: string | null;
}

export type ConversationThread = {
  lead_id: string;
  from_number: string | null;
  to_number: string | null;
  name: string | null;
  email: string | null;
  disposition_current: string | null;
  disposition_source: string | null;
  source: string | null;
  campaign: string | null;
  lead_created_at: string | null;
  total_count?: number;
};

export type ConversationMessage = {
  lead_id: string;
  from_number: string | null;
  to_number: string | null;
  direction: string | null;
  message: string | null;
  message_time: string | null;
  created_at: string | null;
  conversation_status: string | null;
  disposition_source: string | null;
};
