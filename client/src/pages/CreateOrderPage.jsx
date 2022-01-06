import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import {FormattedNumber, IntlProvider} from "react-intl";
import emptyCart from "../assets/emptyCart.gif";
import {CREATE_ORDER_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {useHistory} from "react-router-dom";
import {addToBasket, removeFromBasket} from "../http/basketAPI";
import {fetchUser} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import PhoneInput, {isValidPhoneNumber} from "react-phone-number-input";

const CreateOrderPage = observer(() => {
    const {user, basket} = useContext(Context);
    const [phone, setPhone] = useState('');

    const history = useHistory();

    useEffect(() => {

        fetchUser().then(data =>{
            user.setUser(data)
            setPhone(user.user.phoneNumber)
        }


    )

    }, [])


    const addHandler = (deviceId) => {
        addToBasket({deviceId: deviceId}).then(() => {
            basket.setIsBasketUpdated(true)
        })
    }

    const deleteHandler = (deviceId) => {
        removeFromBasket(deviceId).then(() => {
            basket.setIsBasketUpdated(true)
        })
    }


    return (
        <Container fluid={"md"} className={"h-100"}>
            <Row className="mt-3 mb-3">
                <h1>Оформление заказа</h1>
            </Row>

            <Row className={"mb-4"}>
                <Col md={9}>
                    <h2 style={{fontSize: 25}}>Укажите контактную информацию:</h2>

                    <Card className={"p-4"} border={"warning"}>
                        <Form >
                            <div className={"d-flex flex-column justify-content-between"}>
                                <div className={"d-flex"}>
                                    <div className={"w-100 mr-4"}>
                                        <Form.Label className={"font-weight-bolder"}>Фамилия</Form.Label>
                                        <Form.Control value={user.user.middleName}/>
                                    </div>

                                    <div className={"w-100"}>
                                        <Form.Label className={"font-weight-bolder"}>Имя</Form.Label>
                                        <Form.Control value={user.user.firstName}/>
                                    </div>
                                </div>
                                <div className={"d-flex"}>
                                    <div className={"w-100 mr-4"}>
                                        <Form.Label className={"font-weight-bolder"}>Номер телефона</Form.Label>
                                        <PhoneInput
                                            value={phone}
                                            onChange={setPhone}
                                            international
                                            countryCallingCodeEditable={false}
                                            initialValueFormat="national"
                                            defaultCountry="UA"

                                            type="phone"
                                            placeholder="Номер телефона..."
                                        />
                                        <Form.Text className="text-muted">
                                            {phone ? (isValidPhoneNumber(phone) ? 'Ok' : 'Invalid phone number') : 'Phone number required'}
                                        </Form.Text>
                                    </div>

                                    <div className={"w-100"}>
                                        <Form.Label className={"font-weight-bolder"}>Город</Form.Label>
                                        <Form.Control value={user.user.address}/>
                                    </div>
                                </div>
                            </div>






                        </Form>
                    </Card>


                </Col>
                <Col md={3} >
                    <Card border={"warning"} text={"dark"} className={"text-center position-fixed"}>
                        <Card.Body>
                            <Card.Title>Общее кол-во: {basket.basketCount} шт</Card.Title>
                            <Card.Text>Всего:
                                <IntlProvider locale={"en"}>
                                    <span className="pl-2 font-weight-bolder"><FormattedNumber
                                        value={basket.totalPrice} style="currency" currency="USD"/>
                                    </span>

                                </IntlProvider>
                            </Card.Text>
                            <Card.Text>Скидка:
                                <IntlProvider locale={"en"}>
                                    <span className="pl-2 font-weight-bolder" style={{color: 'red'}}><FormattedNumber
                                        value={basket.totalPrice} style="currency" currency="USD"/>
                                    </span>

                                </IntlProvider>
                            </Card.Text>
                            <Card.Text className="mb-3" style={{fontSize: 23}}>
                                <IntlProvider locale={"en"}>Вместе:
                                    <span className="pl-2 font-weight-bolder" style={{color: 'green'}}><FormattedNumber
                                        value={basket.totalPrice} style="currency" currency="USD"/>
                                    </span>

                                </IntlProvider>
                            </Card.Text>


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
            <Row>
                <Col md={9}>
                    <h2 style={{fontSize: 25}}>Заказ:</h2>
                    <Card border="warning"
                          className="p-2 d-flex align-items-center">
                        {basket.basket.map(basketItem =>

                            <Card key={basketItem.deviceId} className="p-2 mb-2 w-100" border={'success'}>
                                <div className="d-flex justify-content-between align-items-center ">
                                    <div>
                                        <Image className="mr-5" width={35} height={35}
                                               src={process.env.REACT_APP_API_URL + basketItem.device.img}/>
                                        <p style={{width: 'max-content'}}
                                           className="d-inline-block font-weight-bolder mb-0">{basketItem.device.name}</p>
                                    </div>
                                    <div className="d-flex align-items-center">

                                        <Button style={{width: 35}} variant={"warning"}
                                                disabled={basketItem.count === 1}
                                                onClick={() => deleteHandler(basketItem.deviceId)}>-</Button>
                                        <p className="mb-0 ml-2 mr-2">{basketItem.count}</p>
                                        <Button style={{width: 35}} variant={"warning"}
                                                onClick={() => addHandler(basketItem.deviceId)}>+</Button>
                                    </div>

                                    <IntlProvider locale={"en"}>
                                        <p className="mb-0" style={{fontSize: 23, display: "block"}}>
                                            <FormattedNumber
                                                value={basketItem.device.price * basketItem.count}
                                                style="currency" currency="USD"/></p>

                                    </IntlProvider>
                                </div>
                            </Card>
                        )}

                    </Card>

                </Col>



            </Row>
        </Container>
    );
});

export default CreateOrderPage;