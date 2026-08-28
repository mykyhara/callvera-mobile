import { ScreenTemplate } from "@/components/screen-template";
import { NotificationsList } from "@/features/notifications/components/notifications-list";

export default function NotificationsScreen() {
  return (
    <ScreenTemplate
      safeArea={false}
      contentContainerClassName="flex-1 pb-0 pt-4"
    >
      <NotificationsList />
    </ScreenTemplate>
  );
}
