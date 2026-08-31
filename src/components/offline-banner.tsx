import { CloudOffIcon } from "lucide-react-native";
import { Text, View } from "react-native";

import { Icon } from "./ui/icon";

export function OfflineBanner() {
  return (
    <View className="bg-muted-foreground -mx-4 flex-row items-center gap-2 px-4 py-4">
      <Icon as={CloudOffIcon} className="text-muted" />
      <Text className="text-muted">You are currently in offline mode</Text>
    </View>
  );
}
