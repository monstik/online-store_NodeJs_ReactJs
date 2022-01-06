import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Image, Nav, Navbar} from "react-bootstrap";
import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    LOGIN_ROUTE,
    ORDERS_ROUTE,
    PERSONAL_INFORMATION_ROUTE,
    SHOP_ROUTE
} from "../utils/consts";
import {NavLink, useHistory} from "react-router-dom";
import {observer} from "mobx-react-lite";
import cartIcon from "../assets/cartIcon.png";
import ordersIcon from "../assets/ordersIcon.gif";
import accountIcon from "../assets/accountIcon.png";


const NavBar = observer(() => {
    const {user, basket} = useContext(Context);
    const history = useHistory();

    const onLogoutHandler = () => {
        user.setUser({});
        user.setIsAuth(false);
        basket.setBasket([])
        localStorage.removeItem('token');
        history.push(LOGIN_ROUTE);

    }

    const onAdminHandler = () => {
        history.push(ADMIN_ROUTE);
    };

    const onAccountHandler = () => {
        history.push(PERSONAL_INFORMATION_ROUTE);
    };

    const onBasketHandler = () => {
        history.push(BASKET_ROUTE)
    }

    const onOrdersHandler = () => {
        history.push(ORDERS_ROUTE)
    }

    return (

        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink to={SHOP_ROUTE}>Harrington Store</NavLink>

                {user.isAuth ?
                    <Nav className="">

                        {user.user.role === 'ADMIN' &&
                        <Button
                            variant={"outline-danger"}
                            onClick={onAdminHandler}
                        >
                            Админ панель</Button>
                        }

                        <Button variant={"dark"}
                            onClick={onAccountHandler}
                        >
                            <Image width={30} src={accountIcon}/>
                        </Button>

                        <Button variant={"dark"}
                                onClick={onOrdersHandler}
                        >
                            <Image width={30} src={ordersIcon}/>
                        </Button>
                        <Button variant={"dark"}
                                onClick={onBasketHandler}
                        >
                            <Image width={30} src={cartIcon}/>
                        </Button>

                        <Button
                            variant={"outline-light"} className="ml-4"
                            onClick={onLogoutHandler}
                        >
                            Выйти</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto">
                        <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>

                }


            </Container>
        </Navbar>


    );
});

export default NavBar;