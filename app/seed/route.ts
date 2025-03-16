import { db } from '@vercel/postgres';
import { setupDatabase } from '../lib/db';
import { addSeshHistory } from '../lib/session';
import { randomUUID } from 'crypto';

const client = await db.connect();

await setupDatabase()


async function seedHistory() {
    const testUser = (randomUUID())
    const convo = randomUUID()
    const data = {
        mealName: "rice",
        ingredients: [{
            name: "rice",
            quantity: "1 congo",
            price: "#3000"
        }],
        recipe: [
            {
                description: "Wash the rice",
                duration: "10mins",
            },
            {
                description: "Boil the rice",
                duration: "40mins",
                notes: "Boil till soft"
            }
        ]
    }


    addSeshHistory(testUser, convo, data, null);
    
}


export async function GET() {
    try {
      await client.sql`BEGIN`;
      await seedHistory()
      await client.sql`COMMIT`;
  
      return Response.json({ message: 'Database seeded successfully' });
      
    } catch (error) {
      await client.sql`ROLLBACK`;
      return Response.json({ error }, { status: 500 });
    }
  }