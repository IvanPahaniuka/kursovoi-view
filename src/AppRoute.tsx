import React, {useEffect} from 'react';
import qs from 'qs';
import {Route, Switch, useLocation} from "react-router";
import {CatalogPage} from "./pages/CatalogPage";
import {DefaultLayout} from "./layouts/Default";
import {StuffPage} from "./pages/StuffPage";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./redux/reducers/root";
import {IStuffsState} from "./redux/reducers/stuffs";
import * as stuffsActions from './redux/actions/stuffs';
import IStuff from "./types/stuff";
import * as categoriesActions from "./redux/actions/categories";
import * as authActions from "./redux/actions/auth";
import * as ordersActions from "./redux/actions/orders";
import * as basketActions from "./redux/actions/basket";
import {ICategoriesState} from "./redux/reducers/categories";
import {IUserState} from "./redux/reducers/user";
import {BasketPage} from "./pages/BasketPage";
import {OrdersPage} from "./pages/OrdersPage";

export function AppRoute() {
    const location = useLocation();
    const dispatch = useDispatch();
    const {stuffs, filter, filteredStuffs} = useSelector<RootState, IStuffsState>(state => state.stuffs);
    const {categories} = useSelector<RootState, ICategoriesState>(state => state.categories);
    const {user, signinResult, signupResult, error: authError} = useSelector<RootState, IUserState>(state => state.auth);

    useEffect(() => {
        if (!stuffs) dispatch(stuffsActions.getStuffs());
    }, [stuffs, dispatch]);
    useEffect(() => {
        if (stuffs && !filteredStuffs) dispatch(stuffsActions.filterStuffs(stuffs, filter));
    }, [stuffs, filteredStuffs, filter, dispatch]);
    useEffect(() => {
        if (!categories) dispatch(categoriesActions.getCategories());
    }, [categories, dispatch]);
    useEffect(() => {
        if (user === undefined) dispatch(authActions.loadFromStorage());
        if (user && user.orders === undefined) dispatch(ordersActions.getOrders(user));
        if (user && user.basket === undefined) dispatch(basketActions.getBasket(user));
    }, [user, dispatch]);
    useEffect(() => {
        if (signinResult || authError) dispatch(authActions.signinResultReset());
    }, [signinResult, authError, dispatch]);
    useEffect(() => {
        if (signupResult || authError) dispatch(authActions.signupResultReset());
    }, [signupResult, authError, dispatch]);

    const getStuffFromLocation = (): IStuff => {
        const id: string = qs.parse(location.search, { ignoreQueryPrefix: true })?.id?.toString() ?? "0";
        const stuff: IStuff = stuffs?.find(stuff => stuff.id === id) ??
            { id: "0", rates: [], name: 'Неизвестный товар', description: '', cost: 0, image: '', categories: [] };
        return stuff;
    }

    return (
        <DefaultLayout>
            <Switch>
                <Route path='/stuffs'>
                    <StuffPage stuff={getStuffFromLocation()} />
                </Route>
                <Route path='/basket'>
                    <BasketPage />
                </Route>
                <Route path='/orders'>
                    <OrdersPage />
                </Route>
                <Route path='/'>
                    <CatalogPage />
                </Route>
            </Switch>
        </DefaultLayout>
    );
};