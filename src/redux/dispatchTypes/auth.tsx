import * as actionsTypes from '../actionsTypes';
import {ILoggedInUser} from "../../types/user";

export interface ISigninSuccessDispatchType {
    type: typeof actionsTypes.SIGNIN_RESULT_SUCCESS;
    user: ILoggedInUser;
}
export interface ISigninErrorDispatchType {
    type: typeof actionsTypes.SIGNIN_RESULT_ERROR;
    error: string;
}
export interface ISigninResultResetDispatchType {
    type: typeof actionsTypes.SIGNIN_RESULT_RESET;
}
export interface ISignupSuccessDispatchType {
    type: typeof actionsTypes.SIGNUP_RESULT_SUCCESS;
}
export interface ISignupErrorDispatchType {
    type: typeof actionsTypes.SIGNUP_RESULT_ERROR;
    error: string;
}
export interface ISignupResultResetDispatchType {
    type: typeof actionsTypes.SIGNUP_RESULT_RESET;
}
export interface ISignoutDispatchType {
    type: typeof actionsTypes.SIGNOUT;
}

export type AuthSigninDispatchTypes = ISigninSuccessDispatchType | ISigninErrorDispatchType;
export type AuthSignupDispatchTypes = ISignupSuccessDispatchType | ISignupErrorDispatchType;
export type AuthDispatchTypes = AuthSigninDispatchTypes | AuthSignupDispatchTypes |
    ISigninResultResetDispatchType | ISignupResultResetDispatchType | ISignoutDispatchType;