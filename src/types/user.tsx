import IBasket from "./basket";
import IOrder from "./order";

export interface IIdentifiedUser {
    id: string;
}
export interface IUserWithEmail {
    email: string;
}
export interface IUserWithPassword {
    password: string;
}
export interface IUserWithBasket {
    basket: IBasket;
}
export interface IUserWithOrders {
    orders?: Array<IOrder> | undefined;
}
export interface IUserWithAccessToken {
    accessToken: string;
}

export interface IUser extends IIdentifiedUser, IUserWithEmail, IUserWithPassword, IUserWithOrders, IUserWithBasket {}
export interface ISigninUser extends IUserWithEmail, IUserWithPassword {}
export interface ISignupUser extends IUserWithEmail, IUserWithPassword {}
export interface ILoggedInUser extends IIdentifiedUser, IUserWithEmail, IUserWithAccessToken, IUserWithBasket, IUserWithOrders {}