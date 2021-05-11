import * as actionsTypes from "../actionsTypes";
import IStuff from '../../types/stuff';
import {StuffsDispatchTypes} from "../dispatchTypes/stuffs";

export interface IStuffsState {
    stuffs?: Array<IStuff>;
}

const defaultState: IStuffsState = {
    stuffs: undefined
}

export const stuffsReducer = (state: IStuffsState = defaultState, action: StuffsDispatchTypes) : IStuffsState => {
    switch (action.type) {
        case actionsTypes.GET_STUFFS:
            return {...state, stuffs: action.stuffs};

        case actionsTypes.RATE_STUFF:
            return {...state};

        default:
            return state;
    }
}