import {Dispatch} from "redux";
import * as actionsTypes from '../actionsTypes';
import {StuffsDispatchTypes} from "../generators/stuffs";
import IStuff from "../../types/stuff";

let stuffs: Array<IStuff> = [
    { name: "Товар 1", cost: 1.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg" },
    { name: "Товар 2", cost: 2.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg" },
    { name: "Товар 3", cost: 3.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg" },
    { name: "Товар 4", cost: 4.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg" },
    { name: "Товар 1", cost: 1.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg" },
    { name: "Товар 2", cost: 2.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg" },
    { name: "Товар 3", cost: 3.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg" },
    { name: "Товар 4", cost: 4.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg" },
    { name: "Товар 1", cost: 1.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg" },
    { name: "Товар 2", cost: 2.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg" },
    { name: "Товар 3", cost: 3.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg" },
    { name: "Товар 4", cost: 4.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg" },
];

export const getStuffs = () => async (dispatch: Dispatch<StuffsDispatchTypes>) => {
    //todo get stuffs by api
    dispatch({type: actionsTypes.GET_STUFFS, stuffs: stuffs});
}