import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "expo-router/react-navigation";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaListener } from "react-native-safe-area-context";
import { Uniwind } from "uniwind";

import { AuthProvider, useAuth } from "@/providers/auth-provider";
import { GlobalFiltersProvider } from "@/providers/global-filters-provider";
import { QueryProvider } from "@/providers/query-provider";
import "../../global.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <QueryProvider>
      <AuthProvider>
        <SafeAreaListener
          onChange={({ insets }) => {
            Uniwind.updateInsets(insets);
          }}
        >
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <GestureHandlerRootView className="flex-1">
              <BottomSheetModalProvider>
                <RootNavigator />
              </BottomSheetModalProvider>
              <PortalHost />
            </GestureHandlerRootView>
          </ThemeProvider>
        </SafeAreaListener>
      </AuthProvider>
    </QueryProvider>
  );
}

const SCREENS = {
  APP_ROOT: "(tabs)",
  SIGN_IN: "(auth)/sign-in",
  LEAD_DETAILS: "lead/[id]",
  CALL_DETAILS: "call/[id]",
  CONVERSATION: "conversation/[leadId]",
  NOTIFICATIONS: "notifications/index",
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
          <Stack.Screen
            name={SCREENS.LEAD_DETAILS}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={SCREENS.CALL_DETAILS}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={SCREENS.CONVERSATION}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={SCREENS.NOTIFICATIONS}
            options={{ headerShown: false }}
          />
        </Stack.Protected>
      </Stack>
    </GlobalFiltersProvider>
  );
}
