import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import UserStore from "./store/UserStore";
import App from './App';
import DeviceStore from "./store/DeviceStore";
import TypeStore from "./store/TypeStore";
import BrandStore from "./store/BrandStore";
import AlertMessageStore from "./store/AlertMessageStore";
import AdminStore from "./store/AdminStore";
import BasketStore from "./store/BasketStore";

export const Context = createContext(null);

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        devices: new DeviceStore(),
        types: new TypeStore(),
        brands: new BrandStore(),
        alertMessage: new AlertMessageStore(),
        admin: new AdminStore(),
        basket: new BasketStore()
    }}>
        <App/>
    </Context.Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

