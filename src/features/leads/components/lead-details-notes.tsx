import { memo } from "react";
import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

interface Note {
  id: string;
  author: string;
  text: string;
}

interface LeadDetailsNotesProps {
  notes: Note[];
  canManageNotesAndTags: boolean;
  onAddNote: () => void;
}

function LeadDetailsNotesComponent({
  notes,
  canManageNotesAndTags,
  onAddNote,
}: LeadDetailsNotesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notes</CardTitle>
      </CardHeader>
      <CardContent className="gap-2">
        {notes.map((note) => (
          <View key={note.id}>
            <Text className="text-sm">{note.text}</Text>
            <Text variant="muted" className="text-xs">
              {note.author}
            </Text>
          </View>
        ))}
        {canManageNotesAndTags && (
          <Button
            variant="outline"
            size="sm"
            onPress={onAddNote}
            className="self-start"
          >
            <Text>Add note</Text>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export const LeadDetailsNotes = memo(LeadDetailsNotesComponent);
