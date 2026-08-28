import { memo } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

interface LeadDetailsTagsProps {
  tags: string[];
  canManageNotesAndTags: boolean;
  onAddTag: () => void;
}

function LeadDetailsTagsComponent({
  tags,
  canManageNotesAndTags,
  onAddTag,
}: LeadDetailsTagsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tags</CardTitle>
      </CardHeader>
      <CardContent className="flex-row flex-wrap items-center gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="outline">
            <Text>{tag}</Text>
          </Badge>
        ))}
        {canManageNotesAndTags && (
          <Button variant="outline" size="sm" onPress={onAddTag}>
            <Text>Add tag</Text>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export const LeadDetailsTags = memo(LeadDetailsTagsComponent);
