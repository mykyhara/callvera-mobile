import * as LabelPrimitive from "@rn-primitives/label";
import { Platform } from "react-native";

import { ALLOW_FONT_SCALING, MAX_FONT_SIZE_MULTIPLIER } from "@/constants/text";
import { cn } from "@/lib/utils";

function Label({
  className,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  disabled,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Text>) {
  return (
    <LabelPrimitive.Root
      className={cn(
        "flex flex-row items-center gap-2 select-none",
        Platform.select({
          web: "cursor-default leading-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        }),
        disabled && "opacity-50",
      )}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled}
    >
      <LabelPrimitive.Text
        className={cn(
          "text-foreground text-sm font-medium",
          Platform.select({ web: "leading-none" }),
          className,
        )}
        allowFontScaling={ALLOW_FONT_SCALING}
        maxFontSizeMultiplier={MAX_FONT_SIZE_MULTIPLIER}
        {...props}
      />
    </LabelPrimitive.Root>
  );
}

export { Label };
