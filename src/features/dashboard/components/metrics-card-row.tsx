import { ComponentProps } from "react";

import { CardRow, CardRow as CardRowComponent } from "@/components/card-row";

export function MetricsCardRow(props: ComponentProps<typeof CardRowComponent>) {
  return (
    <CardRow
      labelContainerClassName="flex-1"
      contentContainerClassName="flex-none w-10"
      {...props}
    />
  );
}
