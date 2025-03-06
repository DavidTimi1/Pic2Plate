
// create a session for all user conversations denoted by the user's id
// store the conversation history in the session

import fs from 'fs';
import path from 'path';

const sessions = {};


export function getSession(userId) {
    // restore session from backup if session object is empty
    if (Object.keys(sessions).length === 0) {
        restoreSession();
    }

    if (!sessions[userId]) {
        sessions[userId] = {
            history: [],
        };
    }

    return sessions[userId];
}

export function addSeshHistory(userId, history) {
    getSession(userId).history.push(history);
}

export function getSeshHistory(userId) {
    return getSession(userId).history;
}

export function clearHistory(userId) {
    getSession(userId).history = [];
}

export function backupSession() {
    const sessionJSON = JSON.stringify(sessions);
    // save to a file or database
    const sessionPath = path.join(process.cwd(), 'session.json');
    fs.writeFileSync(sessionPath, sessionJSON);
}

export function restoreSession() {
    const sessionPath = path.join(process.cwd(), 'session.json');
    const sessionJSON = fs.readFileSync(sessionPath, 'utf8');
    sessions = JSON.parse(sessionJSON);
}