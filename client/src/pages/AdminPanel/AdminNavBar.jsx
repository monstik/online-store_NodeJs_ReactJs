import React, {useContext, useState} from 'react';
import {Button, ButtonGroup, Col, Container, ListGroup, Navbar, Row} from "react-bootstrap";
import {Context} from "../../index";
import {useHistory} from "react-router-dom";
import {ADMIN_PRODUCTS_ROUTE, ADMIN_USERS_ROUTE} from "../../utils/consts";


const AdminNavBar = ({showTypes, showBrands, showDevices}) => {
    const {admin} = useContext(Context);
    const [dropDownMenuVisible, setDropDownMenuVisible] = useState(false);
    const history = useHistory();

    const dropDownHandler = () => {
        setDropDownMenuVisible(!dropDownMenuVisible);
    }

//TODO сделать активными кнопчи через колбэки, а окошки выводить как и в админке роутами
    return (

        <ListGroup className="pt-5"

                   bg="dark"
                    style={{height: '100vh'}}

                   variant="dark">>
            <ListGroup.Item className="p-0">


                <Button onClick={() => history.push(ADMIN_USERS_ROUTE)} variant="dark"

                        className="w-100 border-0"
                >
                    Список пользователей
                </Button>
            </ListGroup.Item>
            <ListGroup.Item className="p-0">
                <Button variant="dark"

                        className="w-100 border-0"
                >
                    Заказы
                </Button>
            </ListGroup.Item>
            <ListGroup.Item className="p-0">
                <Button className="w-100 m-0"
                        variant={dropDownMenuVisible ? 'primary' : 'dark'}
                        onClick={dropDownHandler}>
                    Добавить
                </Button>
            </ListGroup.Item>
            {dropDownMenuVisible &&

            <ButtonGroup vertical  className='m-0'>
                <Button
                    variant="dark"
                    className='text-white-50 border-0'
                    onClick={() => admin.setTypesVisible(true)}>
                    Добавить тип
                </Button>


                <Button
                    variant="dark"
                    className='text-white-50 border-0'
                    onClick={() => admin.setBrandsVisible(true)}>
                    Добавить бренд
                </Button>

                <Button
                    variant="dark"
                    className='text-white-50 border-0'
                    onClick={() => admin.setDevicesVisible(true)}>
                    Добавить устройство
                </Button>
            </ButtonGroup>
            }
            <ListGroup.Item className="p-0">
            <Button variant="dark"
                    onClick={() => history.push(ADMIN_PRODUCTS_ROUTE)}
                    className="w-100 border-0"
            >
                Товары
            </Button>
            </ListGroup.Item>


        </ListGroup>

    );
};

export default AdminNavBar;