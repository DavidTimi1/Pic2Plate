"use server";

import { getUserID } from "../lib/helpers";
import { getSeshHistory } from "../lib/session";


export default async function ConvoDetails( {id}: {id: string} ) {
    const userID = await getUserID();

    let fullHistory;

    try {
        fullHistory = await getSeshHistory(userID);

    } catch (err) {
        console.error(err)
        return {
            success: false,
            error: "Error connecting with db",
        }
    }

    const convoHistories = fullHistory.filter((convo) => convo.id === id);

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