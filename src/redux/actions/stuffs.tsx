import {Dispatch} from "redux";
import * as actionsTypes from '../actionsTypes';
import {IGetStuffsDispatchType, IRateStuffDispatchType, ISearchStuffDispatchType} from "../dispatchTypes/stuffs";
import IStuff from "../../types/stuff";
import IRate from "../../types/rate";

let stuffs: Array<IStuff> = [
    { id: 0, rates: [], name: "Товар 1", description: '', cost: 1.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg", categories: [{id: 0, name: 'Категория 1'}] },
    { id: 1, rates: [], name: "Товар 2", description: '', cost: 2.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg", categories: [{id: 1, name: 'Категория 2'}] },
    { id: 2, rates: [], name: "Товар 3", description: '', cost: 3.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg", categories: [{id: 2, name: 'Категория 3'}] },
    { id: 3, rates: [], name: "Товар 4", description: '', cost: 4.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg", categories: [{id: 3, name: 'Категория 4'}] },
    { id: 4, rates: [], name: "Товар 1", description: '', cost: 1.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg", categories: [{id: 0, name: 'Категория 1'}] },
    { id: 5, rates: [], name: "Товар 2", description: '', cost: 2.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg", categories: [{id: 1, name: 'Категория 2'}] },
    { id: 6, rates: [], name: "Товар 3", description: '', cost: 3.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg", categories: [{id: 2, name: 'Категория 3'}] },
    { id: 7, rates: [], name: "Товар 4", description: '', cost: 4.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg", categories: [{id: 3, name: 'Категория 4'}] },
    { id: 8, rates: [], name: "Товар 1", description: '', cost: 1.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg", categories: [{id: 3, name: 'Категория 4'}] },
    { id: 9, rates: [], name: "Товар 2", description: '', cost: 2.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg", categories: [{id: 2, name: 'Категория 3'}] },
    { id: 10, rates: [], name: "Товар 3", description: '', cost: 3.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg", categories: [{id: 1, name: 'Категория 2'}] },
    { id: 11, rates: [], name: "Товар 4", description: '', cost: 4.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg", categories: [{id: 0, name: 'Категория 1'}] },
];

export const getStuffs = () => async (dispatch: Dispatch<IGetStuffsDispatchType>) => {
    //todo get stuffs by api
    dispatch({type: actionsTypes.GET_STUFFS, stuffs: stuffs});
}
export const rateStuff = (stuff: IStuff, rate: IRate) => async (dispatch: Dispatch<IRateStuffDispatchType>) => {
    //todo rate stuff by api
    let stuffLocal = stuffs.find(stuffLocal => stuffLocal.id === stuff.id);
    if (!stuffLocal) return;

    let rateLocal = stuffLocal.rates.find(rateLocal => rateLocal.user.id === rate.user.id);
    if (rateLocal) {
        rateLocal.value = rate.value;
    }
    else {
        stuffLocal.rates.push(rate);
    }

    dispatch({type: actionsTypes.RATE_STUFF});
}
export const searchStuff = (search: string) => async (dispatch: Dispatch<ISearchStuffDispatchType>) => {
    let searchedStuffs = stuffs.filter(stuff => stuff.name.toLowerCase().includes(search.toLowerCase()));
    dispatch({type: actionsTypes.SEARCH_STUFFS, search, searchedStuffs});
};