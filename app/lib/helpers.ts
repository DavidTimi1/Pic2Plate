import { randomUUID } from "crypto";
import { getCookies, setCookies } from "./cookies";
import { cache } from "react";




export function cleanJSON(content: string) {
  // parse the deduced info from first {  to last }
  const begng = ['{', '['].map(a => content.indexOf(a))
  const starts : {[key: string]: string} = {
    [begng[0] > -1? begng[0] : Infinity]: '}',
    [begng[1] > -1? begng[1] : Infinity]: ']',
  };

  const start = Math.min( ...( Object.keys(starts).map( a => parseInt(a)) ) )

  const end = content.lastIndexOf( starts[ start ] ) + 1;
  const cleanedJSON = JSON.parse(content.slice(start, end));

  return cleanedJSON;
}


export async function getUserID(){
    // Retrieve or set session cookie
    const cookies = await getCookies();
    let userID;

    if (cookies.userID) {
        userID = cookies.userID;
        
    } else {
        userID = randomUUID();
        setCookies({userID});
    }

    return userID;
}



export const getCachedImage = cache(async (url: string) => {
  const res = await fetch(url, {
    next: { revalidate: 3600 } // Cache on disk for 1 hour
  });
  
  if (!res.ok) throw new Error('Failed to fetch image');
  
  // Return the buffer or base64
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer).toString('base64');
});