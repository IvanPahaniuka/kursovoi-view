import IBasket from "./basketStuff";

export default interface IOrder {
    basket: IBasket;
    state: "ordered" | "paid" | "taken" | "revoked";
    createTime: Date;
    takeTime: Date;
}