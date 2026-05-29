import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { data, error, count } = await supabase
    .from("interests")
    .select("*", { count: "exact" })
    .eq("sender_id", 805);
  
  return NextResponse.json({ 
    count,
    data: data?.slice(0,2),
    error: error?.message,
    hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY
  });
}
