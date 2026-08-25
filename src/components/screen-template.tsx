import { PropsWithChildren } from "react";
import {
  ScrollView,
  ScrollViewProps,
  StatusBar,
  StatusBarProps,
  useColorScheme,
  View,
  ViewProps,
} from "react-native";

import { cn } from "@/lib/utils";

interface ScreenTemplateProps extends ScreenTemplateContainerProps {
  statusBarProps?: StatusBarProps;
}

export const ScreenTemplate = ({
  children,
  className,
  contentContainerClassName,
  scrollable = false,
  scrollViewProps,
  viewProps,
  statusBarProps,
}: ScreenTemplateProps) => {
  const colorScheme = useColorScheme();

  return (
    <>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        {...statusBarProps}
      />
      <ScreenTemplateContainer
        className={cn("bg-background flex-1", className)}
        contentContainerClassName={cn(
          "p-4 py-8 sm:py-4 sm:p-6 mt-safe",
          contentContainerClassName,
        )}
        scrollable={scrollable}
        scrollViewProps={scrollViewProps}
        viewProps={viewProps}
      >
        {children}
      </ScreenTemplateContainer>
    </>
  );
};

interface ScreenTemplateContainerProps extends PropsWithChildren {
  className?: string;
  contentContainerClassName?: string;
  scrollable?: boolean;
  scrollViewProps?: Omit<
    ScrollViewProps,
    "contentContainerClassName" | "className"
  >;
  viewProps?: Omit<ViewProps, "className">;
}

const ScreenTemplateContainer = ({
  children,
  className,
  contentContainerClassName,
  scrollable = false,
  scrollViewProps,
  viewProps,
}: ScreenTemplateContainerProps) =>
  scrollable ? (
    <ScrollView
      className={className}
      contentContainerClassName={cn("grow", contentContainerClassName)}
      showsVerticalScrollIndicator={false}
      {...scrollViewProps}
    >
      {children}
    </ScrollView>
  ) : (
    <View className={className} {...viewProps}>
      <View className={cn("flex-1", contentContainerClassName)}>
        {children}
      </View>
    </View>
  );
