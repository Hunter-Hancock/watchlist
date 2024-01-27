import { signInEmail } from "@/app/_actions";
import Link from "next/link";
import OAuthButton from "./oauth-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function LoginModal() {
  const providers = ["Discord", "Google"];

  return (
    <Dialog>
      <DialogTrigger>
        <span className="border-2 px-4 py-2 rounded-md text-xl font-semibold">
          Login
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            <form
              action={signInEmail}
              className="flex animate-in flex-col px-10 py-5 gap-2 rounded-lg">
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
                formAction={signInEmail}>
                Sign In
              </button>
              <div className="flex justify-between pt-5">
                {providers.map((provider) => (
                  <OAuthButton key={provider} provider={provider} />
                ))}
              </div>
              <p className="text-center">
                {"Don't have an account?"}
                <Link
                  href={"/signup"}
                  className="cursor-pointer hover:underline">
                  Sign Up
                </Link>
              </p>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
