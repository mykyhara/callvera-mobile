import { ComponentProps } from "react";
import { View } from "react-native";

import { Skeleton } from "./ui/skeleton";
import { Text } from "./ui/text";

export function SkeletonText(props: ComponentProps<typeof Text>) {
  return (
    <View>
      <Text {...props}></Text>
      <Skeleton className="absolute inset-0" />
    </View>
  );
}
