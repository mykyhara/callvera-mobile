import { supabase } from "@/lib/supabase";
import { UserContext } from "@/types/api";

export async function listNotes(input: { callId?: string; leadId?: string }) {
  let q = supabase
    .from("notes")
    .select("*")
    .eq("is_deleted", false)
    .order("created_at", { ascending: false });
  if (input.callId) q = q.eq("call_id", input.callId);
  else if (input.leadId) q = q.eq("lead_id", input.leadId);
  else return [];
  const { data, error } = await q;
  if (error) throw error;
  return data ?? [];
}

export async function createNote(p: {
  callId?: string;
  leadId?: string;
  content: string;
  ctx: UserContext;
}) {
  const { data, error } = await supabase
    .from("notes")
    .insert({
      call_id: p.callId ?? null,
      lead_id: p.leadId ?? null,
      content: p.content.trim(),
      created_by: p.ctx.userId,
      updated_by: p.ctx.userId,
      created_by_name: p.ctx.name ?? p.ctx.email,
      updated_by_name: p.ctx.name ?? p.ctx.email,
      account_id: p.ctx.accountId,
      is_deleted: false,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateNote(
  id: string,
  content: string,
  ctx: UserContext,
) {
  const { data, error } = await supabase
    .from("notes")
    .update({
      content: content.trim(),
      updated_by: ctx.userId,
      updated_by_name: ctx.name ?? ctx.email,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteNote(id: string) {
  const { error } = await supabase
    .from("notes")
    .update({ is_deleted: true })
    .eq("id", id);
  if (error) throw error;
}
