import {Dispatch} from "redux";
import * as actionsTypes from '../actionsTypes';
import {IBasketUpdateDispatchType} from "../dispatchTypes/basket";
import {ILoggedInUser} from "../../types/user";
import IStuff from "../../types/stuff";
import IBasket from "../../types/basket";

export const setCountOfStuffInBasket = (user: ILoggedInUser, stuff: IStuff, count: number) => async (dispatch: Dispatch<IBasketUpdateDispatchType>) => {
    //todo set stuff count by api
    let newBasket: IBasket = {...user.basket, stuffs: [...user.basket.stuffs]};
    if (count > 0) {
        let index = newBasket.stuffs.findIndex(
            stuffLocal => stuffLocal.baseStuff.id === stuff.id);

        if (index >= 0) {
            newBasket.stuffs[index].count = count;
        } else {
            newBasket.stuffs.push({baseStuff: stuff, count});
        }
    } else {
        let index = newBasket.stuffs.findIndex(
            stuffLocal => stuffLocal.baseStuff.id === stuff.id);

        if (index >= 0) {
            newBasket.stuffs.splice(index, 1);
        }
    }

    let newUser = {...user, basket: newBasket};
    dispatch({type: actionsTypes.BASKET_UPDATE, user: newUser});
}

export const clearBasket = (user: ILoggedInUser) => async (dispatch: Dispatch<IBasketUpdateDispatchType>) => {
    let newUser: ILoggedInUser = {...user, basket: {stuffs: []}};
    dispatch({type: actionsTypes.BASKET_UPDATE, user: newUser});
};