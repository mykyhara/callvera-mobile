import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { isAuthError } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";

import { createNote, deleteNote, updateNote } from "../services/api";
import { notesQueries, NoteObjectType } from "../services/queries";
import { Note } from "../types";
import { normalizeNote } from "../utils/normalize";

export function useGetNotesList(objectType: NoteObjectType, objectId: string) {
  const query = useQuery({
    ...notesQueries.list(objectType, objectId),
    enabled: !!objectId,
    retry: (failureCount, error) => !isAuthError(error) && failureCount < 2,
  });

  return { ...query, isAccessDenied: isAuthError(query.error) };
}

export function useCreateNote(objectType: NoteObjectType, objectId: string) {
  const { userContext } = useAuth();
  const queryClient = useQueryClient();
  const queryKey = notesQueries.list(objectType, objectId).queryKey;

  return useMutation({
    mutationFn: async (content: string) => {
      if (!userContext?.hasWriteAccess) {
        throw new Error("You don't have permission to add notes.");
      }
      return createNote({
        leadId: objectType === "lead" ? objectId : undefined,
        callId: objectType === "call" ? objectId : undefined,
        content,
        ctx: userContext,
      });
    },
    onSuccess: (created) => {
      queryClient.setQueryData<Note[]>(queryKey, (prev) => [
        normalizeNote(created),
        ...(prev ?? []),
      ]);
    },
  });
}

export function useUpdateNote(objectType: NoteObjectType, objectId: string) {
  const { userContext } = useAuth();
  const queryClient = useQueryClient();
  const queryKey = notesQueries.list(objectType, objectId).queryKey;

  return useMutation({
    mutationFn: async ({ id, content }: { id: string; content: string }) => {
      if (!userContext?.hasWriteAccess) {
        throw new Error("You don't have permission to edit notes.");
      }
      return updateNote(id, content, userContext);
    },
    onSuccess: (updated) => {
      queryClient.setQueryData<Note[]>(queryKey, (prev) =>
        (prev ?? []).map((note) =>
          note.id === String(updated.id) ? normalizeNote(updated) : note,
        ),
      );
    },
  });
}

export function useDeleteNote(objectType: NoteObjectType, objectId: string) {
  const { userContext } = useAuth();
  const queryClient = useQueryClient();
  const queryKey = notesQueries.list(objectType, objectId).queryKey;

  return useMutation({
    mutationFn: async (noteId: string) => {
      if (!userContext?.hasWriteAccess) {
        throw new Error("You don't have permission to delete notes.");
      }
      return deleteNote(noteId);
    },
    onMutate: async (noteId) => {
      const previous = queryClient.getQueryData<Note[]>(queryKey);
      queryClient.setQueryData<Note[]>(queryKey, (prev) =>
        (prev ?? []).filter((note) => note.id !== noteId),
      );
      return { previous };
    },
    onError: (_error, _noteId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },
  });
}
