import { LucideIcon } from "lucide-react-native";
import { ReactElement } from "react";
import { View } from "react-native";

import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

import { Icon } from "./ui/icon";

interface CardRowProps {
  icon?: LucideIcon;
  label: string;
  labelContainerClassName?: string;
  content: string | null | ReactElement;
  contentContainerClassName?: string;
}

export function CardRow({
  icon,
  label,
  labelContainerClassName,
  content,
  contentContainerClassName,
}: CardRowProps) {
  return (
    <View className="flex-row px-3 py-2">
      <View
        className={cn(
          "flex-1 flex-row items-center gap-x-2",
          labelContainerClassName,
        )}
      >
        {icon && (
          <Icon
            as={icon}
            size={20}
            className="text-muted-foreground shrink-0"
          />
        )}
        <View className="flex-1">
          <Text numberOfLines={1} className="text-muted-foreground flex-1">
            {label}
          </Text>
        </View>
      </View>

      <View className={cn("flex-2 justify-center", contentContainerClassName)}>
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
}
