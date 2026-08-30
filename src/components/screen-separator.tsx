import { Dimensions, View } from "react-native";

import { cn } from "@/lib/utils";

interface ScreenSeparatorProps {
  className?: string;
}

export const ScreenSeparator = ({ className }: ScreenSeparatorProps) => (
  <View
    className={cn("border-b-border -mx-4 h-0 border-b", className)}
    style={{ width: Dimensions.get("screen").width }}
  />
);
