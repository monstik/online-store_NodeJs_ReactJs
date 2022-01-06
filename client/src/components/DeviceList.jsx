import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import DeviceItem from "./DeviceItem";



const DeviceList = observer(() => {
    const {devices, basket} = useContext(Context);

    return (
        <Row className="d-flex">
            {devices.devices.map(device => {
                let isBasketExist = false
                if(basket.basket.find(basketItem => basketItem.deviceId === device.id)){
                    isBasketExist = true;
                }

                    return <DeviceItem
                        key={device.id}
                        device={device}
                        isBasketExist={isBasketExist}

                    />
                }
            )}
        </Row>
    );
});

export default DeviceList;