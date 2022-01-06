import {
    ADMIN_PRODUCTS_ROUTE,
    ADMIN_ROUTE,
    ADMIN_USERS_ROUTE,
    BASKET_ROUTE,
    DEVICE_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE,
    ORDERS_ROUTE,
    CREATE_ORDER_ROUTE,
    FEEDBACK_ROUTE,
    LIKES_ROUTE,
    PERSONAL_INFORMATION_ROUTE

} from "./utils/consts";
import AdminPage from "./pages/AdminPanel/AdminPage";
import BasketPage from "./pages/BasketPage/BasketPage";
import ShopPage from "./pages/ShopPage";
import DevicePage from "./pages/DevicePage";
import AuthPage from "./pages/AuthPage/AuthPage";

import CreateOrderPage from "./pages/CreateOrderPage";
import AccountPage from "./pages/AccountPage/AccountPage";

export const adminRouts = [
    {
        path: ADMIN_ROUTE,
        Component: AdminPage
    },
    {
        path: ADMIN_USERS_ROUTE,
        Component: AdminPage
    },
    {
        path: ADMIN_PRODUCTS_ROUTE,
        Component: AdminPage
    },
];

export const authRoutes = [

    {
        path: BASKET_ROUTE,
        Component: BasketPage
    },

    {
        path: CREATE_ORDER_ROUTE,
        Component: CreateOrderPage
    },
    {
        path: ORDERS_ROUTE,
        Component: AccountPage
    },
    {
        path: LIKES_ROUTE,
        Component: AccountPage
    },
    {
        path: FEEDBACK_ROUTE,
        Component: AccountPage
    },
    {
        path: PERSONAL_INFORMATION_ROUTE,
        Component: AccountPage
    }


];

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: ShopPage
    },
    {
        path: LOGIN_ROUTE,
        Component: AuthPage
    },
    {
        path: REGISTRATION_ROUTE,
        Component: AuthPage
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage
    },

];