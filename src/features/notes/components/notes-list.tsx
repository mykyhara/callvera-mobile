import { memo, useCallback, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/providers/auth-provider";

import {
  useCreateNote,
  useDeleteNote,
  useGetNotesList,
} from "../hooks/use-notes";
import { NoteObjectType } from "../services/queries";
import { Note } from "../types";
import { NoteDraftRow, NoteRow } from "./notes-row";

interface NotesListProps {
  objectType: NoteObjectType;
  objectId: string;
}

interface NotesListItemsProps {
  notes: Note[];
  canDelete: boolean;
  onDelete: (id: string) => void;
}

function NotesListItemsComponent({
  notes,
  canDelete,
  onDelete,
}: NotesListItemsProps) {
  return (
    <>
      {notes.map((note, index) => (
        <View key={note.id}>
          <NoteRow note={note} canDelete={canDelete} onDelete={onDelete} />
          {index < notes.length - 1 && <Table.Separator />}
        </View>
      ))}
    </>
  );
}

const NotesListItems = memo(NotesListItemsComponent);

function NotesListComponent({ objectType, objectId }: NotesListProps) {
  const { userContext } = useAuth();
  const canManageNotes = !!userContext?.hasWriteAccess;

  const {
    data: notes,
    isPending,
    isError,
    isAccessDenied,
    isRefetching,
    refetch,
  } = useGetNotesList(objectType, objectId);

  const { mutate: createNote } = useCreateNote(objectType, objectId);
  const { mutate: deleteNote } = useDeleteNote(objectType, objectId);

  const [isDraftVisible, setIsDraftVisible] = useState(false);
  const [draftContent, setDraftContent] = useState("");

  const handleCreatePress = useCallback(() => {
    setDraftContent("");
    setIsDraftVisible(true);
  }, []);

  const handleSaveDraft = useCallback(() => {
    const trimmed = draftContent.trim();
    if (!trimmed) return;
    createNote(trimmed, {
      onSuccess: () => {
        setIsDraftVisible(false);
        setDraftContent("");
      },
    });
  }, [draftContent, createNote]);

  const handleCancelDraft = useCallback(() => {
    setIsDraftVisible(false);
    setDraftContent("");
  }, []);

  const handleDeleteNote = useCallback(
    (noteId: string) => {
      deleteNote(noteId);
    },
    [deleteNote],
  );

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const hasContent = (notes?.length ?? 0) > 0 || isDraftVisible;

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Notes</CardTitle>
        {canManageNotes && !isAccessDenied && (
          <Button variant="outline" size="sm" onPress={handleCreatePress}>
            <Text>+ Create</Text>
          </Button>
        )}
      </CardHeader>
      <CardContent className={hasContent ? "h-72" : "h-18 justify-center"}>
        {isPending ? (
          <ActivityIndicator />
        ) : isAccessDenied ? (
          <Text variant="muted" className="text-center text-sm">
            You don&apos;t have access to view this.
          </Text>
        ) : isError ? (
          <Text variant="muted" className="text-center text-sm">
            Failed to load notes.
          </Text>
        ) : !hasContent ? (
          <Text variant="muted" className="text-center text-sm">
            No notes yet.
          </Text>
        ) : (
          <Table.Root className="flex-1">
            <ScrollView
              className="flex-1"
              keyboardShouldPersistTaps="handled"
              refreshControl={
                <RefreshControl
                  refreshing={isRefetching}
                  onRefresh={handleRefresh}
                />
              }
            >
              {isDraftVisible && (
                <View>
                  <NoteDraftRow
                    content={draftContent}
                    onChangeContent={setDraftContent}
                    onCancel={handleCancelDraft}
                    onSubmit={handleSaveDraft}
                  />
                  {(notes?.length ?? 0) > 0 && <Table.Separator />}
                </View>
              )}
              {notes && (
                <NotesListItems
                  notes={notes}
                  canDelete={canManageNotes}
                  onDelete={handleDeleteNote}
                />
              )}
              {notes && notes.length > 0 && (
                <View className="items-center py-3">
                  <Text variant="muted" className="text-xs">
                    No more notes.
                  </Text>
                </View>
              )}
            </ScrollView>
          </Table.Root>
        )}
      </CardContent>
    </Card>
  );
}

export const NotesList = memo(NotesListComponent);
