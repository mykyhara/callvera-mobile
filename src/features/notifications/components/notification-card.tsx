import { View } from "react-native";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

import { Notification } from "../types";
import {
  formatNotificationDate,
  getNotificationContactLabel,
  isNotificationHandled,
} from "../utils/normalize";

interface NotificationCardProps {
  notification: Notification;
  isMarking: boolean;
  markError?: string | null;
  onMarkHandled: () => void;
}

export function NotificationCard({
  notification,
  isMarking,
  markError,
  onMarkHandled,
}: NotificationCardProps) {
  const handled = isNotificationHandled(notification.status);
  const contact = getNotificationContactLabel(notification);
  const typeLabel = notification.notificationType?.trim() || "Notification";
  const statusLabel = notification.status?.trim() || "Open";
  const locationLabel =
    [notification.locationName, notification.brandName]
      .filter(Boolean)
      .join(" · ") || "No location";

  return (
    <Card className="gap-2 py-4">
      <CardHeader className="gap-2 px-4">
        <View className="flex-row flex-wrap gap-2">
          <Badge variant="outline">
            <Text>{typeLabel}</Text>
          </Badge>
          <Badge
            variant={
              handled
                ? "secondary"
                : notification.actionRequired
                  ? "destructive"
                  : "default"
            }
          >
            <Text>{statusLabel}</Text>
          </Badge>
        </View>
        <CardTitle className="text-base">{contact}</CardTitle>
      </CardHeader>
      <CardContent className="gap-1 px-4">
        {notification.contactPhone ? (
          <Text variant="muted">{notification.contactPhone}</Text>
        ) : null}
        <Text variant="muted">{locationLabel}</Text>
        <Text variant="muted">
          {formatNotificationDate(notification.createdAt)}
        </Text>
      </CardContent>

      {handled ? null : (
        <CardContent className="gap-2 px-4 pt-1">
          {markError ? (
            <Text className="text-destructive text-sm">{markError}</Text>
          ) : null}
          <Button
            variant="outline"
            size="sm"
            disabled={isMarking}
            onPress={onMarkHandled}
            className="self-start"
          >
            <Text>
              {isMarking ? "Marking..." : markError ? "Retry" : "Mark handled"}
            </Text>
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
