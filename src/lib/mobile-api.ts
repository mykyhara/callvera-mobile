import { AuthError } from "@supabase/supabase-js";

import { supabase } from "./supabase";

export async function callMobileApi<T>(
  base: string,
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new AuthError("Authentication required.", 401);

  const response = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
      ...init.headers,
    },
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) throw new Error(payload.error ?? "Request failed.");

  return payload as T;
}
