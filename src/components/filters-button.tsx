import { FilterIcon } from "lucide-react-native";
import { View } from "react-native";

import { cn } from "@/lib/utils";

import { BottomSheetModalRef } from "./bottom-sheet";
import { Button } from "./ui/button";
import { Icon } from "./ui/icon";
import { Text } from "./ui/text";

interface FiltersButtonProps {
  bottomSheetModalRef: BottomSheetModalRef;
  activeCount?: number;
}

export const FiltersButton = ({
  bottomSheetModalRef,
  activeCount = 0,
}: FiltersButtonProps) => (
  <Button
    variant="outline"
    className="size-10 rounded-full"
    onPress={() => {
      bottomSheetModalRef.current?.present();
    }}
  >
    <Icon as={FilterIcon} />

    {activeCount > 0 && (
      <View className="bg-destructive absolute -top-0.5 -right-0.5 size-4 items-center justify-center rounded-full">
        <Text
          className={cn("text-primary-foreground text-[10px]", {
            "leading-none": activeCount > 9,
          })}
        >
          {activeCount > 9 ? "+" : activeCount}
        </Text>
      </View>
    )}
  </Button>
);
