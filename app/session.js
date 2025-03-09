
// create a session for all user conversations denoted by the user's id
// store the conversation history in the session

import fs from 'fs';
import path from 'path';

const sessions = {};


export function getSession(userId) {
    // restore session from backup if session object is empty

    if (!sessions[userId]) {
        const userHistory = restoreSession(userId);

        sessions[userId] = {
            history: userHistory,
        };
    }

    return sessions[userId];
}


export function addSeshHistory(userId, newData, convoID) {
    getSession(userId).history.push({
        id: convoID,
        data: newData,
    });
    backupSession(userId);
}


export function getSeshHistory(userId) {
    return getSession(userId).history;
}


export function backupSession(userID) {
    // Object.keys(sessions).forEach((userId) => {
    //     const sessionPath = path.join(process.cwd(), 'sessions', `${userId}.json`);
    //     const sessionJSON = JSON.stringify(sessions[userId]);

    //     fs.writeFileSync(sessionPath, sessionJSON, 'utf8');
    // });
    
    const sessionPath = path.join(process.cwd(), 'sessions', `${userID}.json`);
    const sessionJSON = JSON.stringify(getSession(userID));
    fs.writeFileSync(sessionPath, sessionJSON, 'utf8');
}


export function restoreSession(userID) {
    const sessionPath = path.join(process.cwd(), 'sessions', `${userID}.json`);
    if (!fs.existsSync(sessionPath)) {
        return [];
    }

    const sessionJSON = fs.readFileSync(sessionPath, 'utf8');
    return JSON.parse(sessionJSON);
}