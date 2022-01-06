import React, {useContext} from 'react';
import {Button, Card, Image} from "react-bootstrap";
import {FormattedNumber, IntlProvider} from "react-intl";
import {addToBasket, removeFromBasket} from "../../../http/basketAPI";
import {Link, useHistory} from "react-router-dom";
import {DEVICE_ROUTE} from "../../../utils/consts";

const BasketItem = ({setIsBasketUpdated, basketItem}) => {

    const history = useHistory();

    const addCountHandler = (deviceId) => {
        addToBasket({deviceId: deviceId})
            .then(() => {
                setIsBasketUpdated(true)
            })
    }

    const deleteCountHandler = (deviceId) => {
        removeFromBasket(deviceId)
            .then(() => {
                setIsBasketUpdated(true)
            })
    }

    const removeProductHandler = (deviceId) => {
        removeFromBasket(deviceId, true)
            .then(() => {
                setIsBasketUpdated(true)
            })
    }


    return (
        <Card
            key={basketItem.deviceId}
            className="p-2 mb-2 w-100"
            border={'success'}>
            <div className="d-flex justify-content-between align-items-center ">
                <div>
                    <Image className="mr-5" width={90} height={90}
                           src={process.env.REACT_APP_API_URL + basketItem.device.img}/>
                    <Link
                        style={{width: 'max-content'}}
                        to={DEVICE_ROUTE + "/" + basketItem.deviceId}
                        className="d-inline-block font-weight-bolder"
                    >{basketItem.device.name}</Link>
                </div>
                <div className="d-flex align-items-center">

                    <Button style={{width: 35}} variant={"warning"}
                            onClick={() => deleteCountHandler(basketItem.deviceId)}>-</Button>
                    <p className="mb-0 ml-2 mr-2">{basketItem.count}</p>
                    <Button style={{width: 35}} variant={"warning"}
                            onClick={() => addCountHandler(basketItem.deviceId)}>+</Button>
                </div>
                <div className="d-flex ">
                    <IntlProvider locale={"en"}>
                        <p className="mb-0" style={{fontSize: 23, display: "block"}}>
                            <FormattedNumber
                                value={basketItem.device.price * basketItem.count}
                                style="currency" currency="USD"/></p>

                    </IntlProvider>
                    <Button onClick={() => removeProductHandler(basketItem.deviceId)}
                            className="ml-3" variant={"outline-danger"}>X</Button>
                </div>
            </div>


        </Card>
    );
};

export default BasketItem;