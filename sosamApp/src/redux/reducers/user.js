const CHECK_LOGIN = 'CHECK_LOGIN';
const CHECK_ENERGY = 'CHECK_ENERGY';

const initialState = {
    loggedIn : false,
    uid : '',
    energy : 0
};

const user = (state = initialState, action ) => {
    if(action.type == CHECK_LOGIN)
        return {
            ...state,
            loggedIn : action.loggedIn,
            uid : action.uid,
        }
    if(action.type == CHECK_ENERGY){
        return{
            ...state,
            energy : action.energy
        }
    }
    else
        return state;
}

export default user;