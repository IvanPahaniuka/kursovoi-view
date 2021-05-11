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
import {ICategoriesState} from "./redux/reducers/categories";
import {IAuthState} from "./redux/reducers/auth";

export function AppRoute() {
    const location = useLocation();
    const dispatch = useDispatch();
    const {stuffs, search, searchedStuffs} = useSelector<RootState, IStuffsState>(state => state.stuffs);
    const {categories} = useSelector<RootState, ICategoriesState>(state => state.categories);
    const {user, signinResult, signupResult, error: authError} = useSelector<RootState, IAuthState>(state => state.auth);

    useEffect(() => {
        if (!stuffs) dispatch(stuffsActions.getStuffs());
    }, [stuffs, dispatch]);

    useEffect(() => {
        if (!searchedStuffs) dispatch(stuffsActions.searchStuff(search));
    }, [searchedStuffs, search, dispatch]);

    useEffect(() => {
        if (!categories) dispatch(categoriesActions.getCategories());
    }, [categories, dispatch]);

    useEffect(() => {
        if (user === undefined) dispatch(authActions.loadFromStorage());
    }, [user, dispatch]);

    useEffect(() => {
        if (signinResult || authError) dispatch(authActions.signinResultReset());
    }, [signinResult, authError, dispatch]);

    useEffect(() => {
        if (signupResult || authError) dispatch(authActions.signupResultReset());
    }, [signupResult, authError, dispatch]);

    const getStuffFromLocation = (): IStuff => {
        const id = +(qs.parse(location.search, { ignoreQueryPrefix: true }).id ?? -1);
        const stuff: IStuff = stuffs?.find(stuff => stuff.id === id) ??
            { id: -1, rates: [], name: 'Неизвестный товар', description: '', cost: 0, image: '', categories: [] };
        return stuff;
    }

    return (
        <DefaultLayout>
            <Switch>
                <Route path={'/stuffs/'}>
                    <StuffPage stuff={getStuffFromLocation()} />
                </Route>
                <Route path={'/'}>
                    <CatalogPage />
                </Route>
            </Switch>
        </DefaultLayout>
    );
};