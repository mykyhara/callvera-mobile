import { X } from "lucide-react-native";
import { memo, useCallback, useRef, useState } from "react";
import { Pressable, TextInput, View } from "react-native";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/providers/auth-provider";

import { useAddTag, useGetTags, useRemoveTag } from "../hooks/use-tags";

interface TagsPanelProps {
  leadId: string;
}

function TagsPanelComponent({ leadId }: TagsPanelProps) {
  const { userContext } = useAuth();
  const canManageTags = !!userContext?.hasWriteAccess;

  const { data: tags, isPending, isAccessDenied } = useGetTags(leadId);
  const { mutate: addTag, isPending: isAdding } = useAddTag(leadId);
  const { mutate: removeTag } = useRemoveTag(leadId);

  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<TextInput>(null);

  const handleAddPress = useCallback(() => {
    setShowInput(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const handleSubmit = useCallback(() => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    addTag(trimmed, {
      onSuccess: () => {
        setInputValue("");
        setShowInput(false);
      },
    });
  }, [inputValue, addTag]);

  const handleCancel = useCallback(() => {
    setInputValue("");
    setShowInput(false);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tags</CardTitle>
      </CardHeader>
      <CardContent className="gap-3">
        <View className="flex-row flex-wrap items-center gap-2">
          {isPending ? (
            <Text variant="muted" className="text-sm">
              Loading…
            </Text>
          ) : isAccessDenied ? (
            <Text variant="muted" className="text-sm">
              You don&apos;t have access to view this.
            </Text>
          ) : !tags || tags.length === 0 ? (
            <Text variant="muted" className="text-sm">
              No tags yet.
            </Text>
          ) : (
            tags.map((tag) => (
              <Badge key={tag.id} variant="outline" className="gap-1">
                <Text>{tag.tagName}</Text>
                {canManageTags && (
                  <Pressable onPress={() => removeTag(tag.tagId)} hitSlop={8}>
                    <Icon as={X} className="text-muted-foreground size-3" />
                  </Pressable>
                )}
              </Badge>
            ))
          )}
        </View>

        {canManageTags &&
          !isAccessDenied &&
          (showInput ? (
            <View className="flex-row items-center gap-2">
              <Input
                ref={inputRef}
                className="flex-1"
                placeholder="Tag name"
                value={inputValue}
                onChangeText={setInputValue}
                onSubmitEditing={handleSubmit}
                returnKeyType="done"
                maxLength={50}
              />
              <Button
                size="sm"
                onPress={handleSubmit}
                disabled={isAdding || !inputValue.trim()}
              >
                <Text>Add</Text>
              </Button>
              <Button variant="outline" size="sm" onPress={handleCancel}>
                <Text>Cancel</Text>
              </Button>
            </View>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onPress={handleAddPress}
              className="self-start"
            >
              <Text>Add tag</Text>
            </Button>
          ))}
      </CardContent>
    </Card>
  );
}

export const TagsPanel = memo(TagsPanelComponent);
