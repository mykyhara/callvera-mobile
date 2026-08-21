import { ComponentProps } from "react";

import { cn } from "@/lib/utils";

import { Text } from "./ui/text";

export const ErrorText = ({
  children,
  className,
  ...props
}: ComponentProps<typeof Text>) => (
  <Text className={cn("text-destructive text-sm", className)} {...props}>
    {children}
  </Text>
);
