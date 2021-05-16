import * as actionsTypes from "../actionsTypes";
import IStuff from '../../types/stuff';
import {StuffsDispatchTypes} from "../dispatchTypes/stuffs";
import IFilter from "../../types/filter";

export interface IStuffsState {
    stuffs?: Array<IStuff>;
    filter: IFilter;
    filteredStuffs?: Array<IStuff>;
}

const defaultState: IStuffsState = {
    stuffs: undefined,
    filter: {},
    filteredStuffs: undefined
}

export const stuffsReducer = (state: IStuffsState = defaultState, action: StuffsDispatchTypes) : IStuffsState => {
    switch (action.type) {
        case actionsTypes.UPDATE_STUFFS:
            return {...state, stuffs: action.stuffs, filteredStuffs: undefined};

        case actionsTypes.RATE_STUFF:
            return {...state, stuffs: undefined, filteredStuffs: undefined};

        case actionsTypes.FILTER_STUFFS:
            return {...state, filter: action.filter, filteredStuffs: action.filteredStuffs}

        default:
            return state;
    }
}