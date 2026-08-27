import { FilterIcon } from "lucide-react-native";

import { BottomSheetModalRef } from "./bottom-sheet";
import { Button } from "./ui/button";
import { Icon } from "./ui/icon";
import { Text } from "./ui/text";

interface FiltersButtonProps {
  bottomSheetModalRef: BottomSheetModalRef;
  label?: string;
}

export const FiltersButton = ({
  bottomSheetModalRef,
  label = "Filters",
}: FiltersButtonProps) => (
  <Button
    onPress={() => {
      bottomSheetModalRef.current?.present();
    }}
  >
    <Icon as={FilterIcon} />
    <Text>{label}</Text>
  </Button>
);
