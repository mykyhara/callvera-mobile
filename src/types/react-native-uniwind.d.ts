import "react-native";

declare module "react-native" {
  interface FlatListProps<ItemT> {
    className?: string;
  }
}
