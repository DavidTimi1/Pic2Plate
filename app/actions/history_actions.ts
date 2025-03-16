import { getUserID } from "../lib/helpers";
import { getSeshHistory } from "../lib/session";



export default async function getUserSessionHistory(){
    const userID = await getUserID();

    try {
        const userHistory = await getSeshHistory(userID)

        const truncHistory = userHistory.map( convo => {
            const {imgSrc, mealName} = convo.data;
            return {id: convo.id, imgSrc, mealName}
        })

        return {success: true, data: truncHistory}

    } catch (err){

        return {success: false, error: err}
    }
    
}


export async function hasSessionHistory(){
    const userID = await getUserID();

    try {
        const userHistory = await getSeshHistory(userID)
        return {success: true, data: Boolean(userHistory.length)}

    } catch (err){

        return {success: false, error: err}
    }
    
}