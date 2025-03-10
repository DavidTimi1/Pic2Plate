"use server";

import { getSeshHistory } from "../session";
import { getUserID } from "../lib/helpers";


export default async function ConvoDetails( {id}: {id: string} ) {
    const userID = await getUserID();

    const fullHistory = getSeshHistory(userID);
    console.log(fullHistory)
    const convoHistories = fullHistory.filter((convo: any) => convo.id === id);

    if (!convoHistories.length) {
        return {
            success: false,
            error: "No conversation found with that ID",
        }
    }

    return {
        success: true,
        data: convoHistories[0].data,
    }

}