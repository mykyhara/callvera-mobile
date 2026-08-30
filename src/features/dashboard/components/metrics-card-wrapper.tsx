import { PropsWithChildren } from "react";
import { Pressable } from "react-native";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricsCardWrapperProps extends PropsWithChildren {
  title: string;
  onPress: () => void;
}

export function MetricsCardWrapper({
  children,
  title,
  onPress,
}: MetricsCardWrapperProps) {
  return (
    <Pressable className="active:bg-accent rounded-xl" onPress={onPress}>
      <Card className="bg-transparent">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </Pressable>
  );
}
