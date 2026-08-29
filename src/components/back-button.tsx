import { router } from "expo-router";
import { ChevronLeftIcon } from "lucide-react-native";

import { Button } from "./ui/button";
import { Icon } from "./ui/icon";

interface BackButtonProps {
  alwaysVisible?: boolean;
}

export const BackButton = ({ alwaysVisible = false }: BackButtonProps) => {
  if (!alwaysVisible && !router.canGoBack()) {
    return null;
  }

  return (
    <Button
      variant="outline"
      onPress={router.back}
      className="size-10 rounded-full"
    >
      <Icon as={ChevronLeftIcon} />
    </Button>
  );
};
