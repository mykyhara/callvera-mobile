import { GlobalFiltersBar } from "@/components/global-filters-bar";
import { ScreenTemplate } from "@/components/screen-template";
import { DashboardMetricsGrid } from "@/features/dashboard/components/dashboard-metrics-grid";

export default function DashboardScreen() {
  return (
    <ScreenTemplate contentContainerClassName="gap-y-4" scrollable>
      <GlobalFiltersBar />
      <DashboardMetricsGrid />
    </ScreenTemplate>
  );
}
