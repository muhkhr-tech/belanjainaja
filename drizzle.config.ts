import { defineConfig } from 'drizzle-kit'
import * as dotenv from "dotenv";

dotenv.config({path: ".env.development.local"});

export default defineConfig({
  schema: ["./lib/schema.ts", "./lib/dddSchema.ts"],
  driver: 'pg',
  out: "./drizzle",
  dbCredentials: {
    connectionString: process.env?.POSTGRES_URL? process.env?.POSTGRES_URL : ''
  },
  verbose: true,
  strict: true,
})