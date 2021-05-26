const CHECK_LOGIN = 'CHECK_LOGIN';

const checkLogin = (check, uid)=>{ 
    return((dispatch)=>{
        dispatch({
            type : CHECK_LOGIN,
            loggedIn : check,
            uid : uid
        });
    })
}

export default checkLogin;