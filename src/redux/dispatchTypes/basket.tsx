import * as actionsTypes from '../actionsTypes';
import {ILoggedInUser} from "../../types/user";

export interface IBasketUpdateDispatchType {
    type: typeof actionsTypes.BASKET_UPDATE;
    user: ILoggedInUser;
}

export type BasketDispatchTypes = IBasketUpdateDispatchType;