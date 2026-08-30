import { NotesList } from "@/features/notes/components/notes-list";

interface CallDetailsNotesProps {
  callId: string;
}

export function CallDetailsNotes({ callId }: CallDetailsNotesProps) {
  return <NotesList objectType="call" objectId={callId} />;
}
