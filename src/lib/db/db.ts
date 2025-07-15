// import { drizzle } from 'drizzle-orm/better-sqlite3'
// import Database from 'better-sqlite3'
// import * as schema from './schema'

// // Create SQLite database
// const sqlite = new Database(process.env.DATABASE_URL || './sqlite.db')

// // Create Drizzle database instance with schema
// export const db = drizzle(sqlite, { schema })
// console.log("📦 Connecting to SQLite...");

// // Initialize database tables
// export async function initDb() {
//   try {
//     // Create tables if they don't exist
//     sqlite.exec(`
//       CREATE TABLE IF NOT EXISTS users (
//         id TEXT PRIMARY KEY,
//         name TEXT,
//         email TEXT NOT NULL,
//         emailVerified INTEGER,
//         image TEXT
//       )
//     `)
    
//     sqlite.exec(`
//       CREATE TABLE IF NOT EXISTS accounts (
//         userId TEXT NOT NULL,
//         type TEXT NOT NULL,
//         provider TEXT NOT NULL,
//         providerAccountId TEXT NOT NULL,
//         refresh_token TEXT,
//         access_token TEXT,
//         expires_at INTEGER,
//         token_type TEXT,
//         scope TEXT,
//         id_token TEXT,
//         session_state TEXT,
//         PRIMARY KEY (provider, providerAccountId),
//         FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
//       )
//     `)
    
//     sqlite.exec(`
//       CREATE TABLE IF NOT EXISTS sessions (
//         sessionToken TEXT PRIMARY KEY,
//         userId TEXT NOT NULL,
//         expires INTEGER NOT NULL,
//         FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
//       )
//     `)
    
//     sqlite.exec(`
//       CREATE TABLE IF NOT EXISTS verificationTokens (
//         identifier TEXT NOT NULL,
//         token TEXT NOT NULL,
//         expires INTEGER NOT NULL,
//         PRIMARY KEY (identifier, token)
//       )
//     `)
    
//     sqlite.exec(`
//       CREATE TABLE IF NOT EXISTS tasks (
//         id TEXT PRIMARY KEY,
//         title TEXT NOT NULL,
//         description TEXT,
//         completed INTEGER NOT NULL DEFAULT 0,
//         userId TEXT NOT NULL,
//         createdAt INTEGER NOT NULL,
//         updatedAt INTEGER NOT NULL,
//         FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
//       )
//     `)
    
//     console.log('Database initialized successfully')
//   } catch (error) {
//     console.error('Error initializing database:', error)
//   }
// }

// // Export database instance for direct access if needed
// export { sqlite }
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const client = postgres(process.env.DATABASE_URL!, { ssl: 'require' })
export const db = drizzle(client, { schema })

// (optional) quick connectivity log
client`SELECT 1`.then(() => console.log('✅ Connected to Postgres')).catch((err) => console.error('❌ Failed to connect to Postgres:', err))