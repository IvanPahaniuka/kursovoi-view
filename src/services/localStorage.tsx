import {ILoggedInUser} from "../types/user";

const userItem = "user";

export const saveUser = (user: ILoggedInUser) => {
    localStorage.setItem(userItem, JSON.stringify(user));
};

export const parseUser = () => {
    const item = localStorage.getItem(userItem) ?? "";
    return item ? JSON.parse(item) as ILoggedInUser : null;
}

export const clearUser = () => {
    localStorage.removeItem(userItem);
}