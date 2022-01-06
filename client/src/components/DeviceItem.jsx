import React, {useCallback, useContext} from 'react';
import {Button, Card, Col, Image} from "react-bootstrap";
import ratingStar from "../assets/ratingStar.png";
import {useHistory} from "react-router-dom";
import {BASKET_ROUTE, DEVICE_ROUTE} from "../utils/consts";
import {FormattedNumber, IntlProvider} from "react-intl";
import emptyShopCart from "../assets/emtyShopCart.png"
import fullShopCart from "../assets/cartIcon.png"
import {addToBasket} from "../http/basketAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const DeviceItem = observer(({device, isBasketExist}) => {
    const {alertMessage, user, basket} = useContext(Context);
    const history = useHistory();

    const onProductClick = () => {
        history.push(DEVICE_ROUTE + '/' + device.id)
    }

    const goToBasketHandler = (event) => {
        event.stopPropagation()
        history.push(BASKET_ROUTE);
    }



    const onAddToBasketHandler = (event) => {
        event.stopPropagation()

        addToBasket({deviceId: device.id})
            .then(data => {
                basket.setIsBasketUpdated(true);
                alertMessage.setSuccessMessage(data.message)
            })

    }

    return (
        <Col md={2} className="mt-4">
            <Card className="pt-2" style={{width: 200, cursor: "pointer"}} onClick={onProductClick}>


                <Image className="m-auto" width={180} height={180} src={process.env.REACT_APP_API_URL + device.img}/>
                <Card.Body className="p-1">
                    <Card.Text className={"text-dark text-truncate text  mt-2 mb-0"}>
                        {device.name}
                    </Card.Text>

                    <div className="text-black-50 mt-2 d-flex justify-content-between align-items-center">

                        <div className="d-flex align-items-center align-self-end">
                            <Image width={20} height={20} src={ratingStar}/>
                            <div>{device.rating}</div>
                        </div>
                    </div>
                    <div className="d-flex  align-items-center justify-content-between">
                        <IntlProvider locale={"en"}>
                            <p className="mb-0" style={{fontSize: 23, display: "block"}}><FormattedNumber
                                value={device.price} style="currency" currency="USD"/></p>
                        </IntlProvider>
                        {isBasketExist
                            ?
                            <Button variant={"outline-dark"} onClick={goToBasketHandler}>
                                <Image width={24} src={fullShopCart}/>
                            </Button>
                            :
                            <Button variant={"outline-dark"} onClick={onAddToBasketHandler}>
                                <Image width={24} src={emptyShopCart}/>
                            </Button>
                        }

                    </div>

                </Card.Body>


            </Card>
        </Col>
    );
});

export default DeviceItem;