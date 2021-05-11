import * as actionsTypes from '../actionsTypes';
import IStuff from '../../types/stuff';
import IRate from "../../types/rate";
import ICategory from "../../types/category";
import IFilter from "../../types/filter";

export interface IGetStuffsDispatchType {
    type: typeof actionsTypes.UPDATE_STUFFS;
    stuffs: Array<IStuff>;
}

export interface IFilterStuffsDispatchType {
    type: typeof actionsTypes.FILTER_STUFFS;
    filter: IFilter;
    filteredStuffs: Array<IStuff>;
}

export interface IRateStuffDispatchType {
    type: typeof actionsTypes.RATE_STUFF;
}

export type StuffsDispatchTypes = IGetStuffsDispatchType | IRateStuffDispatchType | IFilterStuffsDispatchType;