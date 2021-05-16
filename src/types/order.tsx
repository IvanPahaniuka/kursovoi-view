import IBasket from "./basket";
import {OrderStates} from "./orderStates";

export default interface IOrder {
    id: string;
    basket: IBasket;
    state: OrderStates;
    createTime: Date;
}