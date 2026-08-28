import { router } from "expo-router";

import { ScreenTemplate } from "@/components/screen-template";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useSignOut } from "@/features/auth/hooks/use-auth-mutations";

export default function ProfileScreen() {
  const { mutate: handleSignOut } = useSignOut();

  return (
    <ScreenTemplate contentContainerClassName="items-center justify-center gap-4">
      <Text>Profile screen placeholder</Text>
      <Button onPress={() => router.navigate({ pathname: "/notifications" })}>
        <Text>Notifications</Text>
      </Button>
      <Button onPress={() => handleSignOut()}>
        <Text>Sign out</Text>
      </Button>
    </ScreenTemplate>
  );
}
