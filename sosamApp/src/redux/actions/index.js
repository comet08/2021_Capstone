import axios from 'axios';
import url from '../../url'

const CHECK_LOGIN = 'CHECK_LOGIN';
const CHECK_ENERGY = 'CHECK_ENERGY';


export const checkLogin = (check, uid)=>{ 
    return((dispatch)=>{
        dispatch({
            type : CHECK_LOGIN,
            loggedIn : check,
            uid : uid,
        });
    })
}

export const checkEnergy = ()=>{ 
    return((dispatch)=>{
        let e = 0;
        axios.get(`http://${url}/energy`)
            .then(res => {
                e = res.data[0].amount;
                dispatch({
                    type : CHECK_ENERGY,
                    energy : e
                });
            })
            .catch(err => {
                console.log('에너지 가져오기 에러');
            });
        dispatch({
            type : CHECK_ENERGY,
            energy : 0
        });
    })
}