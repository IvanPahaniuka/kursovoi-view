import * as actionsTypes from '../actionsTypes';
import {ILoggedInUser} from "../../types/user";

export interface IGetOrdersDispatchType {
    type: typeof actionsTypes.ORDERS_GET;
    user: ILoggedInUser;
}

export type OrdersDispatchTypes = IGetOrdersDispatchType;