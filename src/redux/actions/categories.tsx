import {Dispatch} from "redux";
import * as actionsTypes from '../actionsTypes';
import ICategory from "../../types/category";
import {CategoriesDispatchTypes} from "../dispatchTypes/categories";

let categories: Array<ICategory> = [
    {id: 0, name: 'Категория 1'},
    {id: 1, name: 'Категория 2'},
    {id: 2, name: 'Категория 3'},
    {id: 3, name: 'Категория 4'}
];

export const getCategories = () => async (dispatch: Dispatch<CategoriesDispatchTypes>) => {
    //todo get categories by api
    dispatch({type: actionsTypes.GET_CATEGORIES, categories: categories});
}