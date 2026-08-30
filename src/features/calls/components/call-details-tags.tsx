import { TagsPanel } from "@/features/tags/components/tags-panel";

interface LeadDetailsTagsProps {
  leadId: string;
}

export function LeadDetailsTags({ leadId }: LeadDetailsTagsProps) {
  return <TagsPanel leadId={leadId} />;
}
