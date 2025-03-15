
// create a session for all user conversations denoted by the user's id
// store the conversation history in the session

import fs from 'fs';
import path from 'path';
import { RecipeResult, userSession } from './lib/definitions';
import { UUID } from 'crypto';


const sessions: { [key: string]: userSession | undefined} = {}


export function getSession(userId: string): userSession {
    // restore session from backup if session object is empty

    if (!sessions[userId]) {
        const userSessionObj = restoreSession(userId);

        sessions[userId] = userSessionObj;
    }

    return sessions[userId];
}


export function addSeshHistory(userId: string, convoID: UUID, newData: RecipeResult, imgSrc: string | null ) {
    const userSession = getSession(userId);
    const userHistory = userSession.history;

    userHistory.push({
        id: convoID,
        data: {...newData, imgSrc: imgSrc ?? undefined},
    });
    backupSession(userId);
}


export function getSeshHistory(userId: string) {
    return getSession(userId).history;
}


export function backupSession(userID: string) {
    const sessionPath = path.join("/var/", `sessions_${userID}.json`);
    const sessionJSON = JSON.stringify(getSession(userID));
    fs.writeFileSync(sessionPath, sessionJSON, 'utf8');
}


export function restoreSession(userID: string):userSession {
    const sessionPath = path.join("/var/", `sessions_${userID}.json`);
    if (!fs.existsSync(sessionPath)) {
        return {history: []};
    }

    const sessionJSON = fs.readFileSync(sessionPath, 'utf8');
    return JSON.parse(sessionJSON);
}