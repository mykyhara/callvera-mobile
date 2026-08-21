import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";

import { SCREENS } from "@/constants/navigation";
import { AuthProvider, useAuth } from "@/providers/auth-provider";
import { GlobalFiltersProvider } from "@/providers/global-filters-provider";
import { QueryProvider } from "@/providers/query-provider";
import "../../global.css";

export default function RootLayout() {
  return (
    <QueryProvider>
      <AuthProvider>
        <RootNavigator />
        <PortalHost />
      </AuthProvider>
    </QueryProvider>
  );
}

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
