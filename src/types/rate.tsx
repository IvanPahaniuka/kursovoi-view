import {IIdentifiedUser} from "./user";

export default interface IRate {
    value: number;
    user: IIdentifiedUser;
}