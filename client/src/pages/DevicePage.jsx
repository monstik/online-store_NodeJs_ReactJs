import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row, Spinner} from "react-bootstrap";
import ratingStar from "../assets/bigStar.png";
import {fetchOneDevice} from "../http/devicesAPI";
import {useHistory, useParams} from "react-router-dom";
import {BASKET_ROUTE, CREATE_ORDER_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {addToBasket} from "../http/basketAPI";
import {Context} from "../index";
import emptyBasketIcon from "../assets/emtyShopCart.png";
import basketExistsIcon from "../assets/cartIcon.png";
import {observer} from "mobx-react-lite";

const DevicePage = () => {
    const {basket} = useContext(Context);
    const [device, setDevice] = useState({info: {}});
    const [isBasketExists, setIsBasketExists] = useState(false);
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const {id} = useParams();

    useEffect(() => {
        fetchOneDevice(id)
            .then(fetchDevice => {
                setDevice(fetchDevice);

                if(basket.basket.find(basketItem => basketItem.deviceId === fetchDevice.id)){
                    setIsBasketExists(true);
                }
            })
            .catch(e => alert(e.response.data.message))
            .finally(() => setLoading(false));
    }, [])

    const addToBasketHandler = () => {
        addToBasket({deviceId: id}).then(data => {
            basket.setIsBasketUpdated(true);
            setIsBasketExists(true);
        })
    }

    const goToBasketHandler = () => {
        history.push(BASKET_ROUTE)
    }

    const goBackHandler = () => {
        history.goBack();
    }


    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                <Spinner animation={"grow"}/>
            </Container>
        )
    }

    return (
        <Container className="mt-4">
            <Row className="mt-4 mb-4">
                <Button onClick={goBackHandler}>{'<-'}</Button>
            </Row>
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{device.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"

                            style={{
                                background: `url(${ratingStar}) no-repeat center center`,
                                width: 240,
                                height: 240,
                                backgroundSize: 'cover',
                                fontSize: 64
                            }}

                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: "solid lightgray 5px"}}
                    >
                        <h3>{device.price} грн</h3>

                        {isBasketExists ?
                            <div className={"d-flex flex-column align-items-center"}>
                                <p className={"font-weight-bolder"} style={{fontSize: 16, color: "green"}}>
                                    Товар добавлен в вашу корзину</p>
                                <Image src={basketExistsIcon}/>
                                <Button
                                    variant={"success"}
                                    onClick={goToBasketHandler}
                                >Перейти в корзину</Button>
                            </div>
                            :
                            <>
                                <Image src={emptyBasketIcon}/>
                                <Button

                                onClick={addToBasketHandler}

                                >
                                    Добавить в корзину
                                </Button>
                            </>

                        }



                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {device.info.map((info, index) =>
                    <Row key={info.id}
                         style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}
                    >
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>

        </Container>
    );
};

export default DevicePage;