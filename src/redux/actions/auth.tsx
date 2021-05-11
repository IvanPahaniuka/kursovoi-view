import {Dispatch} from "redux";
import * as actionsTypes from '../actionsTypes';
import {ILoggedInUser, ISigninUser, ISignupUser, IUser} from "../../types/user";
import {
    AuthSigninDispatchTypes,
    AuthSignupDispatchTypes, ISigninResultResetDispatchType,
    ISigninSuccessDispatchType,
    ISignoutDispatchType, ISignupResultResetDispatchType
} from "../dispatchTypes/auth";
import * as localStorage from "../../services/localStorage";

let users: Array<IUser> = [];

export const signin = (user: ISigninUser) => async (dispatch: Dispatch<AuthSigninDispatchTypes>) => {
    //todo auth by api
    let userLocal = users
        .find(userLocal =>
            userLocal.email === user.email &&
            userLocal.password === user.password);

    if (!userLocal) {
        dispatch({type: actionsTypes.SIGNIN_RESULT_ERROR,
            error: "Неверно введён адрес электронной почты или пароль"});
        return;
    }

    let userLogged: ILoggedInUser = {id: userLocal.id, email: userLocal.email, accessToken: ""};
    localStorage.saveUser(userLogged);
    dispatch({type: actionsTypes.SIGNIN_RESULT_SUCCESS, user: userLogged});
}
export const signinResultReset = () => async (dispatch: Dispatch<ISigninResultResetDispatchType>) => {
    dispatch({type: actionsTypes.SIGNIN_RESULT_RESET});
}
export const signup = (user: ISignupUser) => async (dispatch: Dispatch<AuthSignupDispatchTypes>) => {
    //todo auth by api
    let userLocal = users
        .find(userLocal =>
            userLocal.email === user.email);

    if (userLocal) {
        dispatch({type: actionsTypes.SIGNUP_RESULT_ERROR,
            error: "Пользователь с такой электронной почтой уже зарегистрирован"});
        return;
    }

    let id = Math.max(...users.map(userLocal => userLocal.id), -1) + 1;
    let newUser: IUser = {id: id, email: user.email, password: user.password};
    users.push(newUser);

    dispatch({type: actionsTypes.SIGNUP_RESULT_SUCCESS});
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