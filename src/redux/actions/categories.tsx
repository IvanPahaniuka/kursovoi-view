import {Dispatch} from "redux";
import * as api from "../../services/api";
import * as actionsTypes from '../actionsTypes';
import ICategory from "../../types/category";
import {CategoriesDispatchTypes} from "../dispatchTypes/categories";

export const getCategories = () => async (dispatch: Dispatch<CategoriesDispatchTypes>) => {
    let categories: Array<ICategory> = await api.getCategories();
    dispatch({type: actionsTypes.UPDATE_CATEGORIES, categories: categories});
}