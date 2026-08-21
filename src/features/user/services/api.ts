import { supabase } from "@/lib/supabase";
import { LocationOption, UserContext } from "@/types/api";

export async function fetchUserContext(
  authUserId: string,
): Promise<UserContext> {
  const { data, error } = await supabase
    .from("users")
    .select("id, account_id, email, name, role, is_active, has_write_access")
    .eq("auth_id", authUserId)
    .maybeSingle();

  if (error) throw error;
  if (!data || !data.is_active || !data.account_id) {
    throw new Error("Your Callvera account is inactive or unavailable.");
  }

  return {
    authUserId,
    userId: data.id,
    accountId: data.account_id,
    email: data.email,
    name: data.name,
    role: data.role,
    hasWriteAccess: Boolean(data.has_write_access),
  };
}

export async function fetchLocations(
  ctx: UserContext,
): Promise<LocationOption[]> {
  const { data: grants, error: grantError } = await supabase
    .from("user_accessible_locations")
    .select("location_id")
    .eq("user_id", ctx.userId);
  if (grantError) throw grantError;

  let query = supabase
    .from("accounts_agent_config")
    .select(
      "id, franchise, location_id, location_name, brand_locations(location_name)",
    )
    .eq("account_id", ctx.accountId)
    .not("agent_status", "ilike", "disabled");

  const configIds = (grants ?? []).map((g) => g.location_id);
  if (configIds.length) query = query.in("id", configIds);
  else if (ctx.role === "viewer") return [];

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? [])
    .filter((x) => x.location_id != null)
    .map((x: any) => ({
      configId: x.id,
      locationId: Number(x.location_id),
      franchise: x.franchise,
      name: x.brand_locations?.location_name ?? x.location_name,
      originalName: x.location_name,
    }));
}
