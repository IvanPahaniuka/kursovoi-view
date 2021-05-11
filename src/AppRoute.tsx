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

export function AppRoute() {
    const location = useLocation();
    const dispatch = useDispatch();
    const {stuffs} = useSelector<RootState, IStuffsState>(state => state.stuffs);

    useEffect(() => {
        if (!stuffs) dispatch(stuffsActions.getStuffs());
    }, [stuffs, dispatch]);

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