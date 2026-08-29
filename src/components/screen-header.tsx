import { ReactElement } from "react";
import { View } from "react-native";

import { BackButton } from "./back-button";
import { Text } from "./ui/text";

interface ScreenHeaderProps {
  title: string;
  withBackButton?: boolean;
  leftContent?: ReactElement;
  rightContent?: ReactElement;
}

export const ScreenHeader = ({
  title,
  withBackButton = false,
  leftContent,
  rightContent,
}: ScreenHeaderProps) => {
  return (
    <View className="justify-betwee mt-2 h-8 flex-row items-center">
      <View className="flex-1 items-start">
        {leftContent ? leftContent : withBackButton ? <BackButton /> : null}
      </View>

      <View className="flex-1 justify-center">
        <Text variant="h4" className="text-center">
          {title}
        </Text>
      </View>

      <View className="flex-1 items-end">{rightContent}</View>
    </View>
  );
};
