import AddButton from "@/components/AddButton";
import WatchlistCard from "@/components/WatchlistCard";
import { createClient } from "@/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: { category: string; error: string };
}) {
  const supabase = createClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: user_watchlist } = await supabase
    .from("watchlist")
    .select("*")
    .eq("user_id", `${user?.id}`)
    .order("created_at", { ascending: false });

  const watchlist = {
    all: user_watchlist,
    movie: user_watchlist?.filter((item) => item.type === "Movie"),
    tv: user_watchlist?.filter((item) => item.type === "TV"),
    manga: user_watchlist?.filter((item) => item.type === "Manga"),
    anime: user_watchlist?.filter((item) => item.type === "Anime"),
  };

  searchParams.category = searchParams.category ?? "All";

  return (
    <main className="flex flex-col items-center w-full min-h-screen mt-5">
      <div className="flex gap-5">
        <Link
          href={"/?category=All"}
          className="border-2 border-blue-600 px-6 py-2 rounded-md">
          All
        </Link>
        <Link
          href={"/?category=Movie"}
          className="border-2 border-blue-600 px-6 py-2 rounded-md">
          Movies
        </Link>
        <Link
          href={"/?category=TV"}
          className="border-2 border-blue-600 px-6 py-2 rounded-md">
          TV
        </Link>
        <Link
          href={"/?category=Manga"}
          className="border-2 border-blue-600 px-6 py-2 rounded-md">
          Manga
        </Link>
        <Link
          href={"/?category=Anime"}
          className="border-2 border-blue-600 px-6 py-2 rounded-md">
          Anime
        </Link>
      </div>
      <div className="ml-auto mr-10 border-2 bg-blue-600 px-6 py-2 rounded-md mb-5">
        {user ? <AddButton /> : <h1>Login To Add Items to Watchlist</h1>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {searchParams.category === "All" &&
          watchlist.all?.map((item) => (
            <WatchlistCard key={item.id} item={item} />
          ))}
        {searchParams.category === "Movie" &&
          watchlist.movie?.map((item) => (
            <WatchlistCard key={item.id} item={item} />
          ))}
        {searchParams.category === "TV" &&
          watchlist.tv?.map((item) => (
            <WatchlistCard key={item.id} item={item} />
          ))}
        {searchParams.category === "Manga" &&
          watchlist.manga?.map((item) => (
            <WatchlistCard key={item.id} item={item} />
          ))}
        {searchParams.category === "Anime" &&
          watchlist.anime?.map((item) => (
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
