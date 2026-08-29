import { router } from "expo-router";
import { BellIcon, SquareArrowRightExitIcon } from "lucide-react-native";
import { View } from "react-native";

import { ScreenHeader } from "@/components/screen-header";
import { ScreenTemplate } from "@/components/screen-template";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useSignOut } from "@/features/auth/hooks/use-auth-mutations";
import { ProfileCard } from "@/features/user/components/profile-card";

export default function ProfileScreen() {
  return (
    <ScreenTemplate contentContainerClassName="gap-4 pb-4">
      <ScreenHeader title="Profile" />
      <View className="flex-1 justify-between gap-y-4">
        <ProfileCard />
        <ProfileToolbar />
      </View>
    </ScreenTemplate>
  );
}

const ProfileToolbar = () => {
  const { mutate: handleSignOut } = useSignOut();

  return (
    <View className="flex-row gap-2">
      <Button
        variant="secondary"
        className="flex-1"
        onPress={() => router.navigate({ pathname: "/notifications" })}
      >
        <Icon as={BellIcon} />
        <Text>Notifications</Text>
      </Button>
      <Button
        variant="secondary"
        className="flex-1"
        onPress={() => handleSignOut()}
      >
        <Icon as={SquareArrowRightExitIcon} />
        <Text>Sign out</Text>
      </Button>
    </View>
  );
};
