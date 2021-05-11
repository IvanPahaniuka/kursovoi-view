import * as actionsTypes from '../actionsTypes';
import IStuff from '../../types/stuff';
import IRate from "../../types/rate";

export interface IGetStuffsDispatchType {
    type: typeof actionsTypes.GET_STUFFS;
    stuffs: Array<IStuff>;
}

export interface ISearchStuffDispatchType {
    type: typeof actionsTypes.SEARCH_STUFFS;
    search: string;
    searchedStuffs: Array<IStuff>;
}

export interface IRateStuffDispatchType {
    type: typeof actionsTypes.RATE_STUFF;
}

export type StuffsDispatchTypes = IGetStuffsDispatchType | IRateStuffDispatchType | ISearchStuffDispatchType;