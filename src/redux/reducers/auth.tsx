import * as actionsTypes from "../actionsTypes";
import {ILoggedInUser} from "../../types/user";
import {AuthDispatchTypes} from "../dispatchTypes/auth";

export interface IAuthState {
    user?: ILoggedInUser | null;
    signinResult?: "success" | "error";
    signupResult?: "success" | "error";
    error?: string;
}

const defaultState: IAuthState = {
}

export const authReducer = (state: IAuthState = defaultState, action: AuthDispatchTypes) : IAuthState => {
    switch (action.type) {
        case actionsTypes.SIGNIN_RESULT_SUCCESS:
            return {...state, user: action.user, signinResult: "success"};

        case actionsTypes.SIGNIN_RESULT_ERROR:
            return {...state, signinResult: "error", error: action.error};

        case actionsTypes.SIGNIN_RESULT_RESET:
            return {...state, signinResult: undefined, error: undefined};

        case actionsTypes.SIGNUP_RESULT_SUCCESS:
            return {...state, signupResult: "success"};

        case actionsTypes.SIGNUP_RESULT_ERROR:
            return {...state, signupResult: "error", error: action.error};

        case actionsTypes.SIGNUP_RESULT_RESET:
            return {...state, signupResult: undefined, error: undefined};

        case actionsTypes.SIGNOUT:
            return {...state, user: null};

        default:
            return state;
    }
}