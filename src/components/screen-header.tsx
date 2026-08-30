import { ReactElement } from "react";
import { View } from "react-native";

import { BackButton } from "./back-button";
import { Text } from "./ui/text";

export const ENFORCE_BACK_BUTTON = "enforce";

interface ScreenHeaderProps {
  title: string;
  withBackButton?: boolean | typeof ENFORCE_BACK_BUTTON;
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
    <View className="mt-2 h-10 flex-row items-center justify-between sm:-mx-2 sm:ml-0">
      <View className="flex-1 items-start">
        {leftContent ? (
          leftContent
        ) : withBackButton ? (
          <BackButton alwaysVisible={withBackButton === ENFORCE_BACK_BUTTON} />
        ) : null}
      </View>

      <View className="flex-4 justify-center">
        <Text variant="h4" className="text-center">
          {title}
        </Text>
      </View>

      <View className="flex-1 items-end">{rightContent}</View>
    </View>
  );
};
