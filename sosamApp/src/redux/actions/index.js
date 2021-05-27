const CHECK_LOGIN = 'CHECK_LOGIN';

const checkLogin = (check)=>{ 
    return((dispatch)=>{
        dispatch({
            type : CHECK_LOGIN,
            loggedIn : check
        });
    })
}

export default checkLogin;