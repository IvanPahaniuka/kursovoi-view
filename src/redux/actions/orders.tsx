import {Dispatch} from "redux";
import * as api from "../../services/api";
import * as actionsTypes from '../actionsTypes';
import {ILoggedInUser} from "../../types/user";
import {IGetOrdersDispatchType} from "../dispatchTypes/orders";

export const getOrders = (user: ILoggedInUser) => async (dispatch: Dispatch<IGetOrdersDispatchType>) => {
    user.orders = await api.getOrders(user);
    dispatch({type: actionsTypes.ORDERS_GET, user: user});
}