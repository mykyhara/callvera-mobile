import { Session, User } from "@supabase/supabase-js";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

import { restoreSession, subscribeToAuth } from "@/features/auth/services/api";
import {
  useLocationsQuery,
  useUserContextQuery,
} from "@/features/user/hooks/use-user-queries";
import { LocationOption, UserContext } from "@/types/api";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  userContext: UserContext | null;
  locations: LocationOption[];
  isLoading: boolean;
  error: Error | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be wrapped with AuthProvider");
  }
  return ctx;
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthRestored, setIsAuthRestored] = useState(false);

  useEffect(() => {
    restoreSession().then((initialSession) => {
      setSession(initialSession);
      setIsAuthRestored(true);
    });

    const { data: authListener } = subscribeToAuth((newSession) => {
      setSession(newSession);
      setIsAuthRestored(true);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const authUserId = session?.user?.id;

  const userContextQuery = useUserContextQuery(authUserId);
  const locationsQuery = useLocationsQuery(userContextQuery.data);

  const isLoading =
    !isAuthRestored ||
    (!!authUserId && (userContextQuery.isLoading || locationsQuery.isLoading));

  const error =
    (userContextQuery.error as Error) ||
    (locationsQuery.error as Error) ||
    null;

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        userContext: userContextQuery.data ?? null,
        locations: locationsQuery.data ?? EMPTY_LOCATION_OPTIONS,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const EMPTY_LOCATION_OPTIONS: LocationOption[] = [];
