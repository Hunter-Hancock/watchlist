import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema/**",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
  },
} satisfies Config;
