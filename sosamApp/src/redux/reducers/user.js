const CHECK_LOGIN = 'CHECK_LOGIN';


const initialState = {
    loggedIn : false,
    uid : ''
};

const user = (state = initialState, action ) => {
    if(action.type == CHECK_LOGIN)
        return {
            ...state,
            loggedIn : action.loggedIn,
            uid : action.uid
        }
    else
        return state;
}

export default user;