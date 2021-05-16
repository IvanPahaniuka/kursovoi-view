import {Dispatch} from "redux";
import * as actionsTypes from '../actionsTypes';
import {ILoggedInUser, ISigninUser, ISignupUser} from "../../types/user";
import {
    AuthSigninDispatchTypes,
    AuthSignupDispatchTypes, ISigninResultResetDispatchType,
    ISigninSuccessDispatchType,
    ISignoutDispatchType, ISignupResultResetDispatchType
} from "../dispatchTypes/auth";
import * as localStorage from "../../services/localStorage";
import * as api from "../../services/api";

export const signin = (user: ISigninUser) => async (dispatch: Dispatch<AuthSigninDispatchTypes>) => {
    try {
        let userLogged: ILoggedInUser = await api.signin(user);
        localStorage.saveUser(userLogged);
        dispatch({type: actionsTypes.SIGNIN_RESULT_SUCCESS, user: userLogged});
    }catch (e){
        dispatch({type: actionsTypes.SIGNIN_RESULT_ERROR, error: e.message});
    }
}
export const signinResultReset = () => async (dispatch: Dispatch<ISigninResultResetDispatchType>) => {
    dispatch({type: actionsTypes.SIGNIN_RESULT_RESET});
}
export const signup = (user: ISignupUser) => async (dispatch: Dispatch<AuthSignupDispatchTypes>) => {
    try {
        await api.signup(user);
        dispatch({type: actionsTypes.SIGNUP_RESULT_SUCCESS});
    }catch (e){
        dispatch({type: actionsTypes.SIGNUP_RESULT_ERROR, error: e.message});
    }
}
export const signupResultReset = () => async (dispatch: Dispatch<ISignupResultResetDispatchType>) => {
    dispatch({type: actionsTypes.SIGNUP_RESULT_RESET});
}
export const signout = () => async (dispatch: Dispatch<ISignoutDispatchType>) => {
    localStorage.clearUser();
    dispatch({type: actionsTypes.SIGNOUT});
}
export const loadFromStorage = () => async (dispatch: Dispatch<ISigninSuccessDispatchType | ISignoutDispatchType>) => {
    let user = localStorage.parseUser();
    if (!user) {
        dispatch({type: actionsTypes.SIGNOUT});
        return;
    }

    dispatch({type: actionsTypes.SIGNIN_RESULT_SUCCESS, user: user});

}