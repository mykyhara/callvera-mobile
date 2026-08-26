import { LeadsFilters } from "@/types/api";

export const DEFAULT_PAGE_SIZE = 25;
export const MAX_PAGE_SIZE = 100;

export const DEFAULT_LEADS_FILTERS = {
  search: "",
  dispositions: [],
  sources: [],
  campaigns: [],
} as const satisfies LeadsFilters;

export function clampPageSize(pageSize: number): number {
  return Math.min(Math.max(1, pageSize), MAX_PAGE_SIZE);
}
