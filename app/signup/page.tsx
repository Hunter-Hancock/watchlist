import OAuthButton from "@/components/oauth-button";
import { createClient } from "@/supabase/server";
import { cookies, headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Sign Up",
};

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const providers = ["Discord", "Google"];

  const signUpEmail = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          custom_claims: {
            global_name: "global name",
          },
          full_name: "New User",
          avatar_url: "https://i.imgur.com/8Km9tLL.png",
        },
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    await supabase.auth.signInWithPassword({ email, password });

    return redirect("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-600">
      <Link
        href="/"
        className="absolute left-8 top-14 py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1">
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>
      <h1 className="text-2xl animate-in">Create an Account</h1>
      <form
        action={signUpEmail}
        className="flex animate-in flex-col px-10 py-5 gap-2 rounded-lg bg-gray-700">
        <label htmlFor="email">Email</label>
        <input
          className="rounded-md px-4 py-2 mb-6"
          type="email"
          name="email"
          placeholder="youremail@gmail.com"
        />
        <label htmlFor="password">Password</label>
        <input
          className="rounded-md px-4 py-2 mb-6"
          type="password"
          name="password"
          placeholder="********"
        />
        <button
          className="bg-green-700 rounded-md px-4 py-2"
          formAction={signUpEmail}>
          Sign Up
        </button>
        <div className="flex justify-between pt-5">
          {providers.map((provider) => (
            <OAuthButton key={provider} provider={provider} />
          ))}
        </div>
        <p className="text-center">
          Already have an account?{" "}
          <Link href={"/login"} className="cursor-pointer hover:underline">
            Log In
          </Link>
        </p>
        {searchParams.message && (
          <p className="text-red-500">{searchParams.message}</p>
        )}
      </form>
    </div>
  );
}
