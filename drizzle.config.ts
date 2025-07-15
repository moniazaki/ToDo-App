// import { defineConfig } from 'drizzle-kit'

// export default defineConfig({
//   schema: './src/lib/db/schema.ts',
//   out: './drizzle',
//   dialect: 'sqlite',
//   dbCredentials: {
//     url: process.env.DATABASE_URL || 'file:./sqlite.db',
//   },
// })

  import type { Config } from 'drizzle-kit'

export default {
  schema: './src/lib/db/schema.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql', // Changed from 'driver' to 'dialect'
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Changed from 'connectionString' to 'url'
  },
} satisfies Config




