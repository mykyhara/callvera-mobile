import { Button } from "./ui/button";
import { Text } from "./ui/text";

interface ClearFiltersButtonProps {
  label?: string;
  onPress: () => void;
  disabled?: boolean;
}

export const ClearFiltersButton = ({
  label = "Clear filters",
  disabled,
  onPress,
}: ClearFiltersButtonProps) => (
  <Button variant="ghost" disabled={disabled} onPress={onPress}>
    <Text>{label}</Text>
  </Button>
);
