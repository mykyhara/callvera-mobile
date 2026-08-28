import { Tag } from "../types";

export function normalizeTag(row: {
  id: string;
  tag_id: string;
  tags: { tag_name: string } | { tag_name: string }[];
}): Tag {
  const tag = Array.isArray(row.tags) ? row.tags[0] : row.tags;
  return {
    id: row.id,
    tagId: row.tag_id,
    tagName: tag.tag_name,
  };
}
