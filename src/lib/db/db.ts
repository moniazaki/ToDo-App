import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const client = postgres(process.env.DATABASE_URL!, { ssl: 'require' })
export const db = drizzle(client, { schema })

// Initialize database 
export async function initDb() {
  try {
    await client`SELECT 1`
    console.log('Connected to Postgres')
  } catch (err) {
    console.error('Failed to connect to Postgres:', err)
    throw err
  }
}

initDb().catch(console.error)