import React from 'react';
import {Route, Switch} from "react-router";
import {CatalogPage} from "./pages/CatalogPage";
import {DefaultLayout} from "./layouts/Default";

export function AppRoute() {


    return (
        <DefaultLayout>
            <Switch>
                <Route path='/'>
                    <CatalogPage />
                </Route>
            </Switch>
        </DefaultLayout>
    );
};