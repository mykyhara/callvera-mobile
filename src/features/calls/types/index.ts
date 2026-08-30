import { DirectionType } from "@/constants/filters";

export interface CallRow {
  id: string;
  callTime: string;
  fromNumber: string;
  toNumber: string;
  customerName: string;
  callDuration: number;
  dispositionCurrent: string;
  brandName: string;
  locationName: string;
  direction: DirectionType;
  callSummary: string;
  transcript: string;
  totalCount: number;
  isMasked: boolean;
}

export type CallsPage = {
  rows: CallRow[];
  page: number;
  pageSize: number;
  totalCount: number;
  isMasked: boolean;
};

export type CallsFilters = {
  search: string;
};
