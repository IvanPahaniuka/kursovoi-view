import {Dispatch} from "redux";
import * as actionsTypes from '../actionsTypes';
import {
    IFilterStuffsDispatchType,
    IGetStuffsDispatchType,
    IRateStuffDispatchType
} from "../dispatchTypes/stuffs";
import * as api from "../../services/api";
import IStuff from "../../types/stuff";
import IRate from "../../types/rate";
import IFilter from "../../types/filter";

export const getStuffs = () => async (dispatch: Dispatch<IGetStuffsDispatchType>) => {
    let stuffs: Array<IStuff> = await api.getStuffs();
    dispatch({type: actionsTypes.UPDATE_STUFFS, stuffs: stuffs});
}
export const rateStuff = (stuff: IStuff, rate: IRate) => async (dispatch: Dispatch<IRateStuffDispatchType>) => {
    await api.rateStuff(stuff, rate);
    dispatch({type: actionsTypes.RATE_STUFF});
}
export const filterStuffs = (stuffs: Array<IStuff>, filter: IFilter) => async (dispatch: Dispatch<IFilterStuffsDispatchType>) => {
    let {search, categories} = filter;

    let filteredStuffs: Array<IStuff> = [...stuffs];
    if (search) {
        filteredStuffs = filteredStuffs.filter(
            stuff => stuff.name.toLowerCase().includes(search!.toLowerCase()));
    }

    if (categories && categories.length > 0) {
        filteredStuffs = filteredStuffs.filter(
            stuff => stuff.categories.find(
                categoryLocal => categories!.find(
                    categoryFilter => categoryFilter.id === categoryLocal.id)));
    }

    dispatch({type: actionsTypes.FILTER_STUFFS, filter: {...filter}, filteredStuffs});
};