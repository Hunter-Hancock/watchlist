import AddButton from "@/components/AddButton";
import WatchlistCard from "@/components/WatchlistCard";
import { createClient } from "@/supabase/server";
import { cookies } from "next/headers";
import { addItem } from "./_actions";

export default async function Home({
  searchParams,
}: {
  searchParams: { error: string };
}) {
  const supabase = createClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: watchlist } = await supabase
    .from("watchlist")
    .select("*")
    .eq("user_id", `${user?.id}`);

  return (
    <main className="flex flex-col items-center w-full min-h-screen mt-5">
      <div className="ml-auto mr-10 border-2 bg-blue-600 px-6 py-2 rounded-md mb-5">
        {user ? <AddButton /> : <h1>Login To Add Items to Watchlist</h1>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {watchlist?.map((item) => (
          <WatchlistCard key={item.id} item={item} />
        ))}
      </div>
      {searchParams.error && (
        <div className="absolute z-10 text-2xl text-red-500">
          ERROR: {searchParams.error}
        </div>
      )}
    </main>
  );
}
