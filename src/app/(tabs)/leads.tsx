import { GlobalFiltersBar } from "@/components/global-filters-bar";
import { ScreenTemplate } from "@/components/screen-template";
import { LeadsList } from "@/features/leads/components/leads-list";

export default function LeadsListScreen() {
  return (
    <ScreenTemplate contentContainerClassName="gap-y-4">
      <GlobalFiltersBar />
      <LeadsList />
    </ScreenTemplate>
  );
}
