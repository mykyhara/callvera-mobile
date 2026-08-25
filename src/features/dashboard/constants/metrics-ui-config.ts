import { fetchDashboardMetrics } from "../services/api";

export type Metrics = Awaited<ReturnType<typeof fetchDashboardMetrics>>;

export interface DashboardMetricCardConfig {
  key: keyof Metrics;
  label: string;
}

export interface DashboardMetricSectionConfig {
  title: string;
  cards: DashboardMetricCardConfig[];
}

export const DASHBOARD_METRIC_SECTIONS: DashboardMetricSectionConfig[] = [
  {
    title: "Calls",
    cards: [{ key: "totalCalls", label: "Total Calls" }],
  },
  {
    title: "Leads",
    cards: [
      { key: "qualifiedLeads", label: "Qualified" },
      { key: "unqualifiedLeads", label: "Unqualified" },
      { key: "inProgressLeads", label: "In Progress" },
      { key: "unreachableLeads", label: "Unreachable" },
      { key: "totalLeads", label: "Total Leads" },
    ],
  },
  {
    title: "Conversion",
    cards: [
      { key: "converted", label: "Converted" },
      { key: "notConverted", label: "Not Converted" },
    ],
  },
  {
    title: "Transfers",
    cards: [
      { key: "transferSuccessful", label: "Successful" },
      { key: "transferUnsuccessful", label: "Unsuccessful" },
    ],
  },
];
