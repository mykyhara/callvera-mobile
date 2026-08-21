import { PropsWithChildren } from "react";
import { ScrollView, ScrollViewProps, View, ViewProps } from "react-native";

import { cn } from "@/lib/utils";

interface ScreenTemplateProps extends PropsWithChildren {
  className?: string;
  contentContainerClassName?: string;
  scrollable?: boolean;
  scrollViewProps?: Omit<
    ScrollViewProps,
    "contentContainerClassName" | "className"
  >;
  viewProps?: Omit<ViewProps, "className">;
}

export const ScreenTemplate = ({
  children,
  className,
  contentContainerClassName,
  scrollable = false,
  scrollViewProps,
  viewProps,
}: ScreenTemplateProps) => {
  const containerClass = cn("bg-background flex-1", className);
  const contentClass = cn(
    "p-4 py-8 sm:py-4 sm:p-6 mt-safe",
    contentContainerClassName,
  );

  if (scrollable) {
    return (
      <ScrollView
        className={containerClass}
        contentContainerClassName={cn("grow", contentClass)}
        showsVerticalScrollIndicator={false}
        {...scrollViewProps}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View className={containerClass} {...viewProps}>
      <View className={cn("flex-1", contentClass)}>{children}</View>
    </View>
  );
};
