const sessionIdMap = new Map();

const createSession = (sessionId,userId) =>{
    sessionIdMap.set(sessionId,userId);
}

const getSession = (sessionId) =>{
    // console.log(sessionIdMap);
    return sessionIdMap.get(sessionId);
}

const deleteSession = (sessionId) =>{
    sessionIdMap.delete(sessionId);
}

module.exports = {createSession,getSession,deleteSession};
