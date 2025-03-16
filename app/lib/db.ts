import { db } from "@vercel/postgres";


const client = await db.connect();

async function createTables(){
    console.log("Creating tables");

    await client.sql`
        CREATE TABLE IF NOT EXISTS pic2plate_sessions (
            id SERIAL PRIMARY KEY,
            user_id TEXT NOT NULL
        );
    `;
    
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    
    await client.sql`
        CREATE TABLE IF NOT EXISTS pic2plate_convo (
            id UUID PRIMARY KEY,
            user_id TEXT NOT NULL,
            recipe JSONB NOT NULL DEFAULT '{}'  -- Store JSON
        );
    `;

    console.log("Created tables");
}


// Create table if not exists
export async function setupDatabase() {
    await createTables()
}