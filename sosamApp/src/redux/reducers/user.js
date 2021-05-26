const initialState = {
    loggedIn : false
};

const user = (state = initialState, action ) => {
    return {
        ...state,
        loggedIn : action.loggedIn,
        uid : action.uid
    }
}

export default user;