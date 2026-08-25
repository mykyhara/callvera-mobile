import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "expo-router/react-navigation";
import { useColorScheme } from "react-native";

import { AuthProvider, useAuth } from "@/providers/auth-provider";
import { GlobalFiltersProvider } from "@/providers/global-filters-provider";
import { QueryProvider } from "@/providers/query-provider";
import "../../global.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <RootNavigator />
          <PortalHost />
        </ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  );
}

const SCREENS = {
  APP_ROOT: "(tabs)",
  SIGN_IN: "(auth)/sign-in",
} as const;

function RootNavigator() {
  const { session, user, isLoading } = useAuth();
  const isAuthenticated = !!session?.user;

  if (isLoading) {
    return null;
  }

  return (
    <GlobalFiltersProvider key={user?.id ?? "guest"}>
      <Stack>
        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen
            name={SCREENS.SIGN_IN}
            options={{ headerShown: false }}
          />
        </Stack.Protected>

        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen
            name={SCREENS.APP_ROOT}
            options={{ headerShown: false }}
          />
        </Stack.Protected>
      </Stack>
    </GlobalFiltersProvider>
  );
}
