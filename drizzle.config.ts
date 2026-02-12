import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",   // 👈 new field (replaces driver)
  dbCredentials: {
    url: "sqlite.db",
  },
} satisfies Config;
