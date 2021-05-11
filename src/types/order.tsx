import IBasket from "./basket";
import {OrderStates} from "./orderStates";

export default interface IOrder {
    id: number;
    basket: IBasket;
    state: OrderStates;
    createTime: Date;
    takeTime?: Date;
}