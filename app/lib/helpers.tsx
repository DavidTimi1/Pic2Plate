import { randomUUID } from "crypto";
import { getCookies, setCookies } from "./cookies";




export function cleanJSON(generatedContent: any) {
    // get the deduced info from the generated content
    const deduced_info = generatedContent.response.text();    
    console.log(deduced_info)

    // parse the deduced info from first {  to last }
    const start = deduced_info.indexOf("{");
    const end = deduced_info.lastIndexOf("}") + 1;
    const cleanedJSON = JSON.parse(deduced_info.slice(start, end));

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