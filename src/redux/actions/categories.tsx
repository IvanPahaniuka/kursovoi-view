import {Dispatch} from "redux";
import * as actionsTypes from '../actionsTypes';
import ICategory from "../../types/category";
import {CategoriesDispatchTypes} from "../generators/categories";

let categories: Array<ICategory> = [
    {name: 'Категория 1'},
    {name: 'Категория 2'},
    {name: 'Категория 3'},
    {name: 'Категория 4'}
];

export const getCategories = () => async (dispatch: Dispatch<CategoriesDispatchTypes>) => {
    //todo get categories by api
    dispatch({type: actionsTypes.GET_CATEGORIES, categories: categories});
}