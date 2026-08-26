export type LeadRow = {
  id: string;
  name: string | null;
  phone: string | null;
  locationName: string | null;
  disposition: string | null;
  source: string | null;
  campaign: string | null;
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
