import React, {useContext, useEffect, useState} from 'react';
import {fetchUser} from "../../http/userAPI";
import {Context} from "../../index";
import {Col, Container, Row} from "react-bootstrap";

import {Route, useHistory} from "react-router-dom";

import {PERSONAL_INFORMATION_ROUTE, ORDERS_ROUTE} from "../../utils/consts";

import Account from "./Account/Account";
import AccountNavBar from "./components/AccountNavBar";
import Orders from "./Orders/Orders";


const AccountPage = () => {
    const {user} = useContext(Context);

    const [radioValue, setRadioValue] = useState('');

    useEffect(() => {
        fetchUser().then(
            data => {
                user.setUser(data)
            }
        )


    }, [])

    const menuActiveHandler = (value) => {
        setRadioValue(value)
    }


    return (
        <Container fluid className={"pl-5 pr-5 pt-5"}>

            <Row>
                <Col md={3}>
                    <AccountNavBar radioValue={radioValue}/>
                </Col>

                <Col md={9}>

                    <Route
                        path={PERSONAL_INFORMATION_ROUTE}
                        component={() =>
                            <Account menuActiveHandler={() => menuActiveHandler(PERSONAL_INFORMATION_ROUTE)}/>}
                        exact/>
                    <Route
                        path={ORDERS_ROUTE}
                        component={() =>
                            <Orders menuActiveHandler={() => menuActiveHandler(ORDERS_ROUTE)}/>}
                        exact/>

                </Col>
            </Row>

        </Container>
    );
};

export default AccountPage;