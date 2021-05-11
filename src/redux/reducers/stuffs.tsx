import * as actionsTypes from "../actionsTypes";
import IStuff from '../../types/stuff';
import {StuffsDispatchTypes} from "../dispatchTypes/stuffs";

export interface IStuffsState {
    stuffs?: Array<IStuff>;
    search: string;
    searchedStuffs?: Array<IStuff>;
}

const defaultState: IStuffsState = {
    stuffs: undefined,
    search: "",
    searchedStuffs: undefined
}

export const stuffsReducer = (state: IStuffsState = defaultState, action: StuffsDispatchTypes) : IStuffsState => {
    switch (action.type) {
        case actionsTypes.GET_STUFFS:
            return {...state, stuffs: action.stuffs, searchedStuffs: undefined};

        case actionsTypes.RATE_STUFF:
            return {...state};

        case actionsTypes.SEARCH_STUFFS:
            return {...state, search: action.search, searchedStuffs: action.searchedStuffs}

        default:
            return state;
    }
}