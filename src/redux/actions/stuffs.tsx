import {Dispatch} from "redux";
import * as actionsTypes from '../actionsTypes';
import {StuffsDispatchTypes} from "../dispatchTypes/stuffs";
import IStuff from "../../types/stuff";

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

export const getStuffs = () => async (dispatch: Dispatch<StuffsDispatchTypes>) => {
    //todo get stuffs by api
    dispatch({type: actionsTypes.GET_STUFFS, stuffs: stuffs});
}