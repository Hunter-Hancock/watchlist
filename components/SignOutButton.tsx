import { createClient } from "@/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignOutButton() {
  const signOut = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/");
  };

  return (
    <form action={signOut}>
      <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
        Sign Out
      </button>
    </form>
  );
}
