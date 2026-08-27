import { useColorScheme } from "react-native";

import { THEME } from "@/lib/theme";

export const useColors = () => {
  const colorScheme = useColorScheme();
  return colorScheme === "dark" ? THEME.dark : THEME.light;
};
