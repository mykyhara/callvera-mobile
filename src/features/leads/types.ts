export type LeadRow = {
  id: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  locationName: string | null;
  disposition: string | null;
  dispositionSource: string | null;
  source: string | null;
  campaign: string | null;
  summary: string | null;
  revenue: number | null;
  callCounts: number | null;
  createdAt: string | null;
  direction: string | null;
  messageCount: number | null;
  isMasked: boolean;
};

export type LeadsPage = {
  rows: LeadRow[];
  page: number;
  pageSize: number;
  totalCount: number;
  isMasked: boolean;
};

export type LeadDetailsViewModel = LeadRow & {
  createdAtLabel: string;
  revenueLabel: string;
  dispositionLabel: string;
  sourceLabel: string;
};

export type LeadCall = {
  id: string;
  label: string;
  dateLabel: string;
};
