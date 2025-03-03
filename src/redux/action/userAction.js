
import { USER_LOGIN, USER_SIGNUP } from "../contant/userContant";
import { localUserServ } from "../../service/localService";
import { userServ } from "../../service/userServie";


export const setLoginAction = (value) => {
    return {
        type : USER_LOGIN,
        payload: value,
    }
};

export const setSignUpAction = (value) => {
    return {
        type : USER_SIGNUP,
        payload: value,
    }
};



export const setLoginActionService = (value,onCompleted)=>{
    return(dispatch) => {
        userServ.postLogin(value)
                .then((res) => {
            console.log(res);
            dispatch({
                type: USER_LOGIN,
                payload: res.data.content,
            });
            localUserServ.set(res.data.content);
            onCompleted();
        }).catch((err) => {
            console.log(err);
        });
    }
}


export const setSignUpActionService = (value,onCompleted)=>{
    return(dispatch) => {
        userServ.postSignUp(value)
                .then((res) => {
            console.log(res);
            dispatch({
                type: USER_SIGNUP,
                payload: res.data.content,
            });
            localUserServ.set(res.data.content);
            onCompleted();
        }).catch((err) => {
            console.log(err);
        });
    }
}