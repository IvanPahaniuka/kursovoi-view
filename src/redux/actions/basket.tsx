import {Dispatch} from "redux";
import * as actionsTypes from '../actionsTypes';
import {IBasketUpdateDispatchType} from "../dispatchTypes/basket";
import {ILoggedInUser} from "../../types/user";
import IStuff from "../../types/stuff";
import IBasket from "../../types/basket";
import * as api from "../../services/api";

export const setCountOfStuffInBasket = (user: ILoggedInUser, stuff: IStuff, count: number) => async (dispatch: Dispatch<IBasketUpdateDispatchType>) => {
    let newBasket: IBasket = {stuffs: [...user.basket.stuffs]};
    if (count > 0) {
        let index = newBasket.stuffs.findIndex(
            stuffLocal => stuffLocal.stuffId === stuff.id);

        if (index >= 0) {
            newBasket.stuffs[index].count = count;
        } else {
            newBasket.stuffs.push({stuffId: stuff.id, count});
        }
    } else {
        let index = newBasket.stuffs.findIndex(
            stuffLocal => stuffLocal.stuffId === stuff.id);

        if (index >= 0) {
            newBasket.stuffs.splice(index, 1);
        }
    }
    let newUser = {...user, basket: newBasket};
    await api.updateBasket(newUser);

    dispatch({type: actionsTypes.BASKET_UPDATE, user: newUser});
}
export const clearBasket = (user: ILoggedInUser) => async (dispatch: Dispatch<IBasketUpdateDispatchType>) => {
    let newUser: ILoggedInUser = {...user, basket: {stuffs: []}};
    await api.updateBasket(newUser);

    dispatch({type: actionsTypes.BASKET_UPDATE, user: newUser});
}
export const orderBasket = (user: ILoggedInUser) => async (dispatch: Dispatch<IBasketUpdateDispatchType>) => {
    await api.orderBasket(user);
    let newUser: ILoggedInUser = {...user, orders: undefined, basket: {stuffs: []}};
    dispatch({type: actionsTypes.BASKET_UPDATE, user: newUser});
}
