import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(url && anon);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anon as string)
  : null;

export type OrderInsert = {
  name: string;
  phone: string;
  cake_type: string;
  message?: string;
  preferred_date?: string;
};

export async function submitOrder(order: OrderInsert): Promise<void> {
  if (!supabase) {
    // Dev/demo mode — simulate success after a short delay so we can build the
    // UX without provisioning Supabase. Production will fail loud here instead.
    if (import.meta.env.DEV) {
      await new Promise((r) => setTimeout(r, 700));
      return;
    }
    throw new Error(
      "Order backend not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."
    );
  }
  const { error } = await supabase
    .from("orders")
    .insert({
      name: order.name,
      phone: order.phone,
      cake_type: order.cake_type,
      message: order.message ?? null,
      preferred_date: order.preferred_date ?? null,
    });
  if (error) throw new Error(error.message);
}