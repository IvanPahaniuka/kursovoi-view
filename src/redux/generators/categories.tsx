import * as actionsTypes from '../actionsTypes';
import ICategory from '../../types/category';

export interface IGetCategoriesGenerator {
    type: typeof actionsTypes.GET_CATEGORIES;
    categories: Array<ICategory>;
}

export type CategoriesDispatchTypes = IGetCategoriesGenerator;