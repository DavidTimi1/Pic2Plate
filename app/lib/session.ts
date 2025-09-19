
// create a session for all user conversations denoted by the user's id
// store the conversation history in the session

import { UUID } from 'crypto';
import { db } from '@vercel/postgres';
import { ConvoItem, RecipeResult } from './definitions';

const client = await db.connect();

export async function getSession(userId: string) {
  // restore session from backup if session object is empty
  const result = await client.sql`
      SELECT * FROM pic2plate_convo 
      WHERE user_id = ${userId};
  `

  const sessionHistory = result.rows.map( row => ({ id: row?.id, data: row?.recipe }) as ConvoItem)

  return {
    history: sessionHistory
  };
}


export async function addSeshHistory(userId: string, convoID: UUID, newData: RecipeResult, imgSrc: string | null) {

  const data = { ...newData, imgSrc: imgSrc ?? undefined }

  await client.sql`
    INSERT INTO pic2plate_convo (user_id, id, recipe)
    VALUES ( ${userId}, ${convoID}, ${JSON.stringify(data)} );
  `;

}


export async function getSeshHistory(userId: string) {
  const session = await getSession(userId)
  return session.history;
}