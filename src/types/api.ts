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
