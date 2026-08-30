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

export interface CallDetailsViewModel {
  id: string;
  locationId: number;
  callTime: string;
  callDuration: number;
  direction: DirectionType;
  callType: string;
  dispositionCurrent: string;
  customerName: string;
  customerEmail: string;
  fromNumber: string;
  toNumber: string;
  callSuccessful: boolean;
  callRecordingUrl: string;
  userSentiment: string;
  callSummary: string;
  transcript: string;
  brandName: string;
  locationName: string;
  campaign: string;
  leadSource: string;
  leadId: string;
  disconnectionReason: string;
}
