import { Tag } from "../types";
import { listLeadTags } from "./api";
import { normalizeTag } from "../utils/normalize";

export const tagsQueries = {
  list: (leadId: string) => ({
    queryKey: ["lead-tags", leadId] as const,
    queryFn: async (): Promise<Tag[]> => {
      const rows = await listLeadTags(leadId);
      return rows.map(normalizeTag);
    },
  }),
};
