import { getUserID } from "../lib/helpers";
import { getSeshHistory } from "../session";




export default async function getUserSessionHistory(){
    const userID = await getUserID();

    try {
        const userHistory = getSeshHistory(userID)

        const truncHistory = userHistory.map( convo => {
            const {id, imgSrc, mealName} = convo;
            return {id, imgSrc, mealName}
        })

        return {success: true, data: truncHistory}

    } catch (err){

        return {success: false, error: err}
    }
    
}