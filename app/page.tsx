import AuthButton from "@/components/AuthButton";
import { ModeToggle } from "@/components/ModeToggle";
import { createClient } from "@/supabase/server";
import { cookies } from "next/headers";

export default async function Home() {
  const supabase = createClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: watchlist } = await supabase
    .from("watchlist")
    .select("*")
    .eq("user_id", `${user?.id}`);

  console.log(watchlist);

  return (
    <main className="flex flex-col items-center min-h-screen">
      <h1>Hello there</h1>
      <button className="border-2 px-4 py-2 rounded-md bg-blue-600">
        Create Watchlist
      </button>
    </main>
  );
}
