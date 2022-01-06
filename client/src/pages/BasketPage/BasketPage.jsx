import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Button, Card, CardGroup, Col, Container, Image, Row} from "react-bootstrap";
import {Context} from "../../index";
import emptyCart from "../../assets/emptyCart.gif";
import {useHistory} from "react-router-dom";
import {CREATE_ORDER_ROUTE, SHOP_ROUTE} from "../../utils/consts";
import {addToBasket, fetchBasket, removeFromBasket} from "../../http/basketAPI";
import {observer} from "mobx-react-lite";
import {FormattedNumber, IntlProvider} from "react-intl";
import BasketItem from "./BasketItem/BasketItem";

const BasketPage = observer(() => {
    const {user, basket} = useContext(Context);
    const history = useHistory();


    return (
        <Container fluid={"md"}>
            <Row className="mt-3 mb-3">
                <h1>Ваша корзина, {user.user.firstName}</h1>
            </Row>
            <Row>
                <Col md={9}>

                    {basket.basketCount !== 0 ?
                        <Card border="warning"
                              className="p-2">
                            {basket.basket.map(basketItem =>
                                <BasketItem key={basketItem.deviceId} setIsBasketUpdated={(bool) => basket.setIsBasketUpdated(bool)} basketItem={basketItem}/>
                            )}
                        </Card>
                        :
                        <Card border={"warning"}
                              className="p-4 d-flex justify-content-center align-items-center flex-column align-self-center">
                            <Card.Title><h2 className="text-muted">Корзина пустая</h2></Card.Title>
                            <Image src={emptyCart}/>

                            <Button
                                variant={"warning"}
                                onClick={() => history.push(SHOP_ROUTE)}
                            >
                                <h2>Отправится за покупками</h2>
                            </Button>
                        </Card>
                    }
                </Col>


                <Col md={3}>
                    <Card border={"warning"} text={"dark"} className="text-center">
                        <Card.Body>
                            <Card.Title>Общее кол-во: {basket.basketCount} шт</Card.Title>

                            <IntlProvider locale={"en"}>
                                <Card.Text className="mb-3" style={{fontSize: 23}}><FormattedNumber
                                    value={basket.totalPrice} style="currency" currency="USD"/>
                                </Card.Text>

                            </IntlProvider>

                            <Button
                                className="w-100"
                                variant={"warning"}
                                disabled={user.basketCount === 0}
                                onClick={() => history.push(CREATE_ORDER_ROUTE)}
                            >Оформить заказ</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
});

export default BasketPage;