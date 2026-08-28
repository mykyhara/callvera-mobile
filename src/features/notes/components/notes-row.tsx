import { Check, Trash2, X } from "lucide-react-native";
import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Table } from "@/components/ui/table";
import { Text } from "@/components/ui/text";

import { Note } from "../types";

function NoteDraftRow({
  content,
  onChangeContent,
  onCancel,
  onSubmit,
}: {
  content: string;
  onChangeContent: (value: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
}) {
  return (
    <Table.Row className="justify-between py-2">
      <Table.Cell className="min-w-40 flex-1">
        <Input
          value={content}
          onChangeText={onChangeContent}
          placeholder="Write a note…"
          autoFocus
          multiline
          className="text-sm"
        />
      </Table.Cell>
      <Table.Cell className="w-20 flex-none items-end">
        <View className="flex-row">
          <Button variant="ghost" size="icon" onPress={onCancel}>
            <Icon as={X} className="text-muted-foreground size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            disabled={!content.trim()}
            onPress={onSubmit}
          >
            <Icon as={Check} className="text-muted-foreground size-4" />
          </Button>
        </View>
      </Table.Cell>
    </Table.Row>
  );
}

function NoteRow({
  note,
  canDelete,
  onDelete,
}: {
  note: Note;
  canDelete: boolean;
  onDelete: (id: string) => void;
}) {
  return (
    <Table.Row className="items-start gap-2 py-2">
      <Table.Cell className="min-w-0 flex-1 gap-0.5">
        <Text className="text-sm">{note.content}</Text>
        <Text variant="muted" className="text-xs">
          {note.authorName} · {note.createdAtLabel}
        </Text>
      </Table.Cell>
      {canDelete && (
        <Table.Cell className="w-10 flex-none items-end">
          <Button variant="ghost" size="icon" onPress={() => onDelete(note.id)}>
            <Icon as={Trash2} className="text-muted-foreground size-4" />
          </Button>
        </Table.Cell>
      )}
    </Table.Row>
  );
}

export { NoteDraftRow, NoteRow };
