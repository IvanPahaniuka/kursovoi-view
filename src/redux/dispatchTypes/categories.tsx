import * as actionsTypes from '../actionsTypes';
import ICategory from '../../types/category';

export interface IGetCategoriesDispatchType {
    type: typeof actionsTypes.UPDATE_CATEGORIES;
    categories: Array<ICategory>;
}

export type CategoriesDispatchTypes = IGetCategoriesDispatchType;