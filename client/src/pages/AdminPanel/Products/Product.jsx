import React, {useContext} from 'react';
import {Button} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";

const Product = observer( ({device, updateDevice}) => {
    const {devices} = useContext(Context);
    const onUpdateDeviceClick = () => {
        updateDevice();
        devices.setSelectedDevice(device);
    }

    const onDeleteClick = () => {
        devices.setDevices(device);
    }

    return (
        <tr>
            <td>
                {device.id}
            </td>
            <td>
                {device.name}
            </td>
            <td>
                <Button
                    onClick={onUpdateDeviceClick}
                    variant={"success"}>Изменить</Button>
            </td>
            <td>
                <Button variant={"danger"}>Удалить</Button>
            </td>
        </tr>
    );
});

export default Product;