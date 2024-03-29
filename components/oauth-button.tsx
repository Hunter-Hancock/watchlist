"use client";
import { createClient } from "@/utils/supabase/client";
import { Provider } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export default function OAuthButton({ provider }: { provider: string }) {
  const signInProvider = async (provider: string) => {
    const origin = window.location.origin;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider!.toLowerCase() as Provider,
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.error(error);
      return redirect("/signup?message=OAuth error");
    }
  };
  return (
    <button
      className="bg-green-700 rounded-md px-4 py-2 text-neutral-50"
      key={provider}
      onClick={() => signInProvider(provider)}>
      {provider}
    </button>
  );
}
