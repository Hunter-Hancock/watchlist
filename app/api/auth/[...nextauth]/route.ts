import { db } from "@/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";
import Discord from "next-auth/providers/discord";

const handler = NextAuth({
  adapter: DrizzleAdapter(db) as Adapter,
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
});

export { handler as GET, handler as POST };
