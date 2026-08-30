import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queries } from "@/lib/queries";
import { isAuthError } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";

import { addTag, removeTag } from "../services/api";
import { Tag } from "../types";

export function useGetTags(leadId: string) {
  const query = useQuery({
    ...queries.tags.list(leadId),
    enabled: !!leadId,
    retry: (failureCount, error) => !isAuthError(error) && failureCount < 2,
  });

  return { ...query, isAccessDenied: isAuthError(query.error) };
}

export function useAddTag(leadId: string) {
  const { userContext } = useAuth();
  const queryClient = useQueryClient();
  const queryKey = queries.tags.list(leadId).queryKey;

  return useMutation({
    mutationFn: async (tagName: string) => {
      if (!userContext?.hasWriteAccess) {
        throw new Error("You don't have permission to add tags.");
      }
      return addTag(leadId, tagName, userContext);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}

export function useRemoveTag(leadId: string) {
  const { userContext } = useAuth();
  const queryClient = useQueryClient();
  const queryKey = queries.tags.list(leadId).queryKey;

  return useMutation({
    mutationFn: async (tagId: string) => {
      if (!userContext?.hasWriteAccess) {
        throw new Error("You don't have permission to remove tags.");
      }
      return removeTag(leadId, tagId);
    },
    onMutate: async (tagId) => {
      const previous = queryClient.getQueryData<Tag[]>(queryKey);
      queryClient.setQueryData<Tag[]>(queryKey, (prev) =>
        (prev ?? []).filter((tag) => tag.tagId !== tagId),
      );
      return { previous };
    },
    onError: (_error, _tagId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },
  });
}
