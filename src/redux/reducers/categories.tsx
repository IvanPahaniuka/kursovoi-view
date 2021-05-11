import * as actionsTypes from "../actionsTypes";
import ICategory from '../../types/category';
import {CategoriesDispatchTypes} from "../dispatchTypes/categories";

export interface ICategoriesState {
    categories?: Array<ICategory>;
}

const defaultState: ICategoriesState = {
    categories: undefined
}

export const categoriesReducer = (state: ICategoriesState = defaultState, action: CategoriesDispatchTypes) : ICategoriesState => {
    switch (action.type) {
        case actionsTypes.UPDATE_CATEGORIES:
            return {...state, categories: action.categories};

        default:
            return state;
    }
}