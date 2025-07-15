import { handlers } from '@/lib/auth'
console.log("Starting NextAuth API route...");

export const { GET, POST } = handlers

console.log("NextAuth setup complete.");
