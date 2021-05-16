import {ILoggedInUser} from "../types/user";

const userItem = "user";

export const saveUser = (user: ILoggedInUser) => {
    let userToSave: ILoggedInUser = {...user, orders: undefined, basket: undefined};
    localStorage.setItem(userItem, JSON.stringify(userToSave));
};

export const parseUser = () => {
    const item = localStorage.getItem(userItem) ?? "";
    return item ? JSON.parse(item) as ILoggedInUser : null;
}

export const clearUser = () => {
    localStorage.removeItem(userItem);
}