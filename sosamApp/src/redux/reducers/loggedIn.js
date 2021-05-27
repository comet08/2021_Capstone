const initialState = {
    loggedIn : false
};

const loggedIn = (state = initialState, action ) => {
    return {
        ...state,
        loggedIn : action.loggedIn
    }
}

export default loggedIn;
