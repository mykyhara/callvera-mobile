import { ScreenTemplate } from "@/components/screen-template";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useSignOut } from "@/features/auth/hooks/use-auth-mutations";

export default function LeadsListScreen() {
  const { mutate: handleSignOut } = useSignOut();

  return (
    <ScreenTemplate contentContainerClassName="items-center justify-center gap-4">
      <Text>Leads screen placeholder</Text>
      <Button onPress={() => handleSignOut()}>
        <Text>Sign out</Text>
      </Button>
    </ScreenTemplate>
  );
}
