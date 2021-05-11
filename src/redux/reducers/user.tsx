import * as actionsTypes from "../actionsTypes";
import {ILoggedInUser} from "../../types/user";
import {AuthDispatchTypes} from "../dispatchTypes/auth";
import {BasketDispatchTypes} from "../dispatchTypes/basket";

export interface IUserState {
    user?: ILoggedInUser | null;
    signinResult?: "success" | "error";
    signupResult?: "success" | "error";
    error?: string;
}

const defaultState: IUserState = {
}

export const userReducer = (state: IUserState = defaultState, action: AuthDispatchTypes | BasketDispatchTypes) : IUserState => {
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

        case actionsTypes.BASKET_UPDATE:
            return {...state, user: action.user}

        default:
            return state;
    }
}