import AddButton from "@/components/AddButton";
import CardLoading from "@/components/CardLoading";
import HamburguerMenu from "@/components/HamburgerMenu";
import WatchlistCard from "@/components/WatchlistCard";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Home({
  searchParams,
}: {
  searchParams: { category: string; error: string; sort: string };
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

  const categories = ["All", "Movie", "TV", "Manga", "Anime"];

  return (
    <main className="flex flex-col items-center w-full min-h-screen mt-5">
      <div className="md:hidden absolute left-11 z-10">
        {user && <HamburguerMenu />}
      </div>
      <div className="hidden md:flex gap-5">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/?category=${category}`}
            className="border-2 border-blue-600 px-6 py-2 rounded-md">
            {category}
          </Link>
        ))}
      </div>
      <div className="ml-auto mr-10 border-2 bg-blue-600 px-6 py-2 rounded-md mb-5">
        {user ? <AddButton /> : <h1>Login To Add Items to Watchlist</h1>}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-10">
        {user_watchlist
          ?.filter(
            (item) =>
              searchParams.category === "All" ||
              item.type === searchParams.category
          )
          .map((item) => (
            <Suspense key={item.id} fallback={<CardLoading />}>
              <WatchlistCard item={item} />
            </Suspense>
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
