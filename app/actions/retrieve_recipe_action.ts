"use server";

import { getCookie } from "../lib/cookies";
import { HistoryItemData } from "../lib/definitions";
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
        // return the local recipe if it exists, otherwise return an error
        const localRecipe = await getCookie(id);
        if (localRecipe) {
            return {
                success: true,
                data: {
                    ...localRecipe?.recipe,
                    imgSrc: localRecipe?.imgSrc || null,
                } as HistoryItemData
            }
        }

        return {
            success: false,
            error: "No recipe found with that ID",
        }
    }

    return {
        success: true,
        data: convoHistories[0].data,
    }
}