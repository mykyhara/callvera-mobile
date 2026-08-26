import { ScreenTemplate } from "@/components/screen-template";
import { LeadsList } from "@/features/leads/components/leads-list";

export default function LeadsListScreen() {
  return (
    <ScreenTemplate contentContainerClassName="flex-1">
      <LeadsList />
    </ScreenTemplate>
  );
}
