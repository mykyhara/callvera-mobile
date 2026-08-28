import { supabase } from "@/lib/supabase";
import { UserContext } from "@/types/api";

export async function listLeadTags(leadId: string) {
  const { data, error } = await supabase
    .from("lead_tags")
    .select("id,tag_id,tags!inner(tag_name)")
    .eq("lead_id", leadId)
    .eq("is_active", true);
  if (error) throw error;
  return data ?? [];
}

export async function addTag(
  leadId: string,
  tagName: string,
  ctx: UserContext,
) {
  const clean = tagName.trim();
  if (!clean || clean.length > 50)
    throw new Error("Tag must contain 1–50 characters.");
  const { data: tagId, error: rpcError } = await supabase.rpc(
    "get_or_create_tag",
    { p_account_id: ctx.accountId, p_tag_name: clean },
  );
  if (rpcError) throw rpcError;
  const { error } = await supabase.from("lead_tags").insert({
    lead_id: leadId,
    tag_id: tagId,
    account_id: ctx.accountId,
    is_active: true,
  });
  if (error && error.code !== "23505") throw error;
}

export async function removeTag(leadId: string, tagId: string) {
  const { error } = await supabase
    .from("lead_tags")
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .eq("lead_id", leadId)
    .eq("tag_id", tagId)
    .eq("is_active", true);
  if (error) throw error;
}
