import { defineConfig } from "drizzle-kit"

const connectionString = process.env.POSTGRESQL_DATABASE_URL

if (!connectionString) {
  throw new Error("POSTGRESQL_DATABASE_URL must be set")
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./drizzle/schema.ts",
  out: "./drizzle/db",
  dbCredentials: {
    url: connectionString,
  }
})