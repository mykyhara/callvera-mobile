import { NotesList } from "@/features/notes/components/notes-list";

interface LeadDetailsNotesProps {
  leadId: string;
}

export function LeadDetailsNotes({ leadId }: LeadDetailsNotesProps) {
  return <NotesList objectType="lead" objectId={leadId} />;
}
