import axios from "axios";
import * as localStorage from "./localStorage";
import {IIdentifiedUser, ILoggedInUser, ISigninUser, ISignupUser} from "../types/user";
import ICategory from "../types/category";
import IBasket from "../types/basket";
import IBasketStuff from "../types/basketStuff";
import IStuff from "../types/stuff";
import IRate from "../types/rate";
import IOrder from "../types/order";
import {OrderStates} from "../types/orderStates";

const url = "http://localhost:6001/api";
const ACCOUNT = "accounts";
const SIGNIN = `${ACCOUNT}/signin`;
const SIGNUP = `${ACCOUNT}/signup`;
const CATEGORY = "categories";
const STUFFS = "products";
const ORDERS = "orders";


const enrichWithAccessToken = () => {
    const user = localStorage.parseUser();

    if (user && user.accessToken) {
        return {'Authorization': "Bearer " + user.accessToken};
    } else {
        return {};
    }
}

const mapApiCategoryToCategory = (apiCategory: any): ICategory => {
    return {
        id: apiCategory.id,
        name: apiCategory.title
    };
}
const mapApiRatingToRate = (apiRating: any): IRate => {
    return {
        value: apiRating.rating,
        user: {id: apiRating.accountid}
    };
}
const mapApiProductToStuff = (apiProduct: any): IStuff => {
    return {
        id: apiProduct.id,
        name: apiProduct.title,
        description: apiProduct.description,
        cost: apiProduct.price,
        categories: apiProduct.categories.map((apiCategory: any) =>
            mapApiCategoryToCategory(apiCategory)),
        rates: apiProduct.rating.map((apiRating: any) =>
            mapApiRatingToRate(apiRating)),
        image: ""
    };
}
const mapApiProductItemToBasketStuff = (apiStuff: any): IBasketStuff => {
    return {
        stuffId: apiStuff.productid,
        count: apiStuff.count
    };
}
const mapBasketStuffToApiProductItem = (basket: IBasketStuff): any => {
    return {
        ProductId: basket.stuffId,
        Count: basket.count
    };
}

const mapApiCartToBasket = (apiBasket: any): IBasket => {
    return {
        stuffs: apiBasket.map((apiStuff: any) =>
            mapApiProductItemToBasketStuff(apiStuff))
    };
}
const mapApiSigninResponseToLoggedInUser = (apiUser: any): ILoggedInUser => {
    return {
        id: apiUser.id,
        email: apiUser.email,
        accessToken: apiUser.token,
        basket: mapApiCartToBasket(apiUser.cart),
        orders: undefined
    };
}
const mapApiOrderToOrder = (apiOrder: any): IOrder => {
    return {
        id: apiOrder.id,
        basket: {stuffs: apiOrder.products.map((apiProduct: any) => mapApiProductItemToBasketStuff(apiProduct))},
        createTime: apiOrder.create,
        state: apiOrder.status
    };
}

export const signup = async (user: ISignupUser) => {
    await axios.post(SIGNUP, user, {
        baseURL: url
    });
}

export const signin = async (user: ISigninUser) => {
    const response = await axios.post(SIGNIN, user, {
        baseURL: url
    });
    console.log(JSON.stringify(response.data));

    return mapApiSigninResponseToLoggedInUser(response.data);
    //return new VerifiedUser(response.data.name, response.data.accessToken);
}

export const getCategories = async (): Promise<Array<ICategory>> => {
    const response = await axios.get(CATEGORY, {
        baseURL: url
    });
    let resData = response.data;
    return resData.map((apiCategory: any) => mapApiCategoryToCategory(apiCategory));
}

export const getStuffs = async (): Promise<Array<IStuff>> => {
    const response = await axios.get(STUFFS, {
        baseURL: url
    });
    let resData = response.data;
    return resData.map((apiProduct: any) => mapApiProductToStuff(apiProduct));
}

export const getOrders = async (user: IIdentifiedUser): Promise<Array<IOrder>> => {
    const response = await axios.get(`${ACCOUNT}/${user.id}/orders`, {
        headers: enrichWithAccessToken(),
        baseURL: url
    });
    let resData = response.data;
    return resData.map((apiOrder: any) => mapApiOrderToOrder(apiOrder));
}

export const rateStuff = async (stuff: IStuff, rate: IRate) => {
    await axios.post(`${STUFFS}/${stuff.id}/rating`,
        {Rating: rate.value, AccountId: rate.user.id}, {
            headers: enrichWithAccessToken(),
            baseURL: url
        });
}

export const updateBasket = async (user: ILoggedInUser) => {
    await axios.put(`${ACCOUNT}/${user.id}/cart`,
        {Cart: user.basket.stuffs.map(stuff => mapBasketStuffToApiProductItem(stuff))}, {
            headers: enrichWithAccessToken(),
            baseURL: url
        });
}

export const orderBasket = async (user: ILoggedInUser) => {
    await axios.post(ORDERS,
        {AccountId: user.id, Products: user.basket.stuffs.map(stuff => mapBasketStuffToApiProductItem(stuff)), Status: "ordered" as OrderStates}, {
        headers: enrichWithAccessToken(),
        baseURL: url
    });
}