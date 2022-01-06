import React, {useContext} from 'react';
import {Switch, Redirect, Route, useHistory, Router} from "react-router-dom";
import {adminRouts, authRoutes, publicRoutes} from "../routes";
import ShopPage from "../pages/ShopPage";
import {SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import AdminPage from "../pages/AdminPanel/AdminPage";
import Users from "../pages/AdminPanel/Users/Users";

const AppRouter = observer( () => {
    const {user} = useContext(Context);

    return (
        <Switch >
            {(user.isAuth && (user.user.role === 'ADMIN')) && adminRouts.map(
                ({path, Component}) =>
                    <Route key={path} path={path} component={Component} exact/>
            )}


            {user.isAuth && authRoutes.map(
                ({path, Component}) =>
                    <Route key={path} path={path} component={Component} exact/>
            )}
            {publicRoutes.map(
                ({path, Component}) =>
                    <Route key={path} path={path} component={Component} exact/>
            )}

            <Redirect to={SHOP_ROUTE}/>
        </Switch>
    );
});

export default AppRouter;