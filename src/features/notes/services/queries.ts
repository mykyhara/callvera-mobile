import { createQueryKeys } from "@lukemorales/query-key-factory";

import { Note } from "../types";
import { listNotes } from "./api";
import { normalizeNote } from "../utils/normalize";

export type NoteObjectType = "lead" | "call";

export const notesQueries = createQueryKeys("notes", {
  list: (objectType: NoteObjectType, objectId: string) => ({
    queryKey: ["notes", objectType, objectId] as const,
    queryFn: async (): Promise<Note[]> => {
      const rows = await listNotes(
        objectType === "lead" ? { leadId: objectId } : { callId: objectId },
      );
      return rows.map(normalizeNote);
    },
  }),
});
