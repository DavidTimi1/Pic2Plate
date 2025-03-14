import { getUserID } from "../lib/helpers";
import { getSeshHistory } from "../session";




export default async function getUserSessionHistory(){
    const userID = await getUserID();

    try {
        const userHistory = getSeshHistory(userID)

        const truncHistory = userHistory.map( convo => {
            const {imgSrc, mealName} = convo.data;
            return {id: convo.id, imgSrc, mealName}
        })

        return {success: true, data: truncHistory}

    } catch (err){

        return {success: false, error: err}
    }
    
}