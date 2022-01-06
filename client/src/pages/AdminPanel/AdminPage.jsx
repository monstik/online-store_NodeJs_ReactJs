import React, {useContext} from 'react';
import {Row, Col} from "react-bootstrap";
import CreateBrand from "./modals/CreateBrand";
import CreateType from "./modals/CreateType";
import CreateDevice from "./modals/CreateDevice";
import AdminNavBar from "./AdminNavBar";
import Users from "./Users/Users";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {Link, Route, Router, Switch} from "react-router-dom";
import Products from "./Products/Products";
import {ADMIN_PRODUCTS_ROUTE, ADMIN_USERS_ROUTE} from "../../utils/consts";


const AdminPage = observer(() => {
    const {admin} = useContext(Context);


    return (
        <>
            <Row className=" p-0 m-0" bg="dark" style={{background: '#343a40'}}>


                <Col md={2} className="p-0" bg="dark">

                    <AdminNavBar/>
                </Col>
                <Col md={10} className="d-flex flex-column justify-content-lg-start align-items-center p-0 mt-5"
                     bg="dark">

                    <Route path={ADMIN_USERS_ROUTE} component={Users} exact/>
                    <Route path={ADMIN_PRODUCTS_ROUTE} component={Products} exact/>

                </Col>

                <CreateBrand show={admin.brandsVisible} onHide={() => admin.setBrandsVisible(false)}/>
                <CreateType show={admin.typesVisible} onHide={() => admin.setTypesVisible(false)}/>
                <CreateDevice show={admin.devicesVisible} onHide={() => admin.setDevicesVisible(false)}/>
            </Row>

        </>

    );
});

export default AdminPage;