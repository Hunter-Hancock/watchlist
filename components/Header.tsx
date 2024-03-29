import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import LoginModal from "./LoginModal";
import { ModeToggle } from "./ModeToggle";
import ProfileIcon from "./ProfileIcon";

export default async function Header() {
  const supabase = createClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="flex justify-end items-center w-full h-16 px-4 border-2">
      <div className="mr-auto items-center gap-4">
        <h1 className="text-2xl font-bold">Watchlist</h1>
      </div>
      {user ? <ProfileIcon user={user} /> : <LoginModal />}
      <ModeToggle />
    </header>
  );
}
