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

const url = "https://localhost:5001/api";
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
    const getStringHash = (str: string): number => {
        let hash = 0, i, chr;
        if (str.length === 0)
            return hash;

        for (i = 0; i < str.length; i++) {
            chr   = str.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0;
        }
        return hash;
    }

    const urls = [
        "https://uk.ellas-cookies.com/images/novosti-i-obshestvo/indeks-fizicheskogo-obema-produkcii_7.jpg",
        "https://static.tildacdn.com/tild3266-6631-4638-a432-366265343835/Depositphotos_527161.jpg",
        "https://yt3.ggpht.com/ytc/AAUvwnj9EohwA2kUdniHithcEGL1XaS4dPJd7PcFmtTcbg=s900-c-k-c0x00ffffff-no-rj"
    ];

    return {
        id: apiProduct.id,
        name: apiProduct.title,
        description: apiProduct.description,
        cost: apiProduct.price,
        categories: apiProduct.categories.map((apiCategory: any) =>
            mapApiCategoryToCategory(apiCategory)),
        rates: apiProduct.rating.map((apiRating: any) =>
            mapApiRatingToRate(apiRating)),
        image: apiProduct.image ?? urls[getStringHash(apiProduct.id) % urls.length]
    };
}
const mapApiProductItemToBasketStuff = (apiStuff: any): IBasketStuff => {
    return {
        stuffId: apiStuff.productId,
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

    return mapApiSigninResponseToLoggedInUser(response.data);
}
export const getBasket = async (user: ILoggedInUser): Promise<IBasket> => {
    const response = await axios.get(`${ACCOUNT}/${user.id}`, {
        headers: enrichWithAccessToken(),
        baseURL: url
    });

    return {stuffs: response.data.cart.map((apiProduct: any) => mapApiProductItemToBasketStuff(apiProduct))};
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
        {Cart: user.basket?.stuffs.map(stuff => mapBasketStuffToApiProductItem(stuff)) ?? []}, {
            headers: enrichWithAccessToken(),
            baseURL: url
        });
}

export const orderBasket = async (user: ILoggedInUser) => {
    await axios.post(ORDERS,
        {AccountId: user.id, Products: user.basket?.stuffs.map(stuff => mapBasketStuffToApiProductItem(stuff)), Status: "ordered" as OrderStates} ?? [], {
        headers: enrichWithAccessToken(),
        baseURL: url
    });
}