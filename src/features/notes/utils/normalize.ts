import { formatCreatedAt } from "@/lib/utils";

import { Note } from "../types";

export function normalizeNote(row: any): Note {
  return {
    id: String(row.id),
    content: row.content ?? "",
    authorName: row.created_by_name ?? "Unknown",
    createdAtLabel: formatCreatedAt(row.created_at ?? null),
  };
}
