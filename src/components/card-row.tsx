import { LucideIcon } from "lucide-react-native";
import { ReactElement } from "react";
import { View } from "react-native";

import { Text } from "@/components/ui/text";

import { Icon } from "./ui/icon";

export const CardRow = ({
  icon,
  label,
  content,
}: {
  icon?: LucideIcon;
  label: string;
  content: string | null | ReactElement;
}) => (
  <View className="flex-row px-3 py-2">
    <View className="w-1/3 flex-row items-center gap-x-2">
      {icon && (
        <Icon as={icon} size={20} className="text-muted-foreground shrink-0" />
      )}
      <View className="flex-1">
        <Text numberOfLines={1} className="text-muted-foreground flex-1">
          {label}
        </Text>
      </View>
    </View>
    <View className="w-2/3 justify-center">
      {typeof content === "string" ? (
        <Text numberOfLines={1} className="font-semibold">
          {content}
        </Text>
      ) : (
        content
      )}
    </View>
  </View>
);
