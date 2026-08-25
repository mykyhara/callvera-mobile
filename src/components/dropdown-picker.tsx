import { Platform, ScrollView } from "react-native";

import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  Option as SelectOption,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export interface DropdownPickerOption<T extends string = string> {
  label: string;
  value: T;
}

interface DropdownPickerProps<T extends string = string> {
  value?: T;
  label?: string;
  placeholder?: string;
  onSelect: (option: T) => void;
  options: DropdownPickerOption<T>[];
}

export const DropdownPicker = <T extends string = string>({
  value,
  label,
  onSelect,
  options,
  placeholder = "Select",
}: DropdownPickerProps<T>) => {
  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (opt: SelectOption) => {
    if (opt?.value) {
      onSelect(opt.value as T);
    }
  };

  return (
    <Select value={selectedOption} onValueChange={handleSelect}>
      <SelectTrigger className="w-45">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="w-45">
        <NativeSelectScrollView>
          <SelectGroup>
            {!!label && <SelectLabel>{label}</SelectLabel>}
            {options.map((opt) => (
              <SelectItem key={opt.value} label={opt.label} value={opt.value} />
            ))}
          </SelectGroup>
        </NativeSelectScrollView>
      </SelectContent>
    </Select>
  );
};

/**
 * @platform Native only
 * Returns the children on the web
 */
function NativeSelectScrollView({
  className,
  ...props
}: React.ComponentProps<typeof ScrollView>) {
  if (Platform.OS === "web") {
    return <>{props.children}</>;
  }
  return <ScrollView className={cn("max-h-52", className)} {...props} />;
}
