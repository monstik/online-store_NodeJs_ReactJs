import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Form, InputGroup, Spinner, Table} from "react-bootstrap";
import Pages from "../../../components/Pages";
import {Context} from "../../../index";
import Product from "./Product";
import {observer} from "mobx-react-lite";
import {fetchDevices, searchDevices} from "../../../http/devicesAPI";
import UpdateDevice from "../modals/UpdateDevice";
import SearchProduct from "./SearchProduct";

const Products = observer(() => {

    const {admin, devices} = useContext(Context);
    const [showModal, setShowModal] = useState(false);


    const onShowModal = () => {
        setShowModal(true);
        admin.setOnUpdate(false);
    }


    return (
        <Container className="p-0 m-0">

            <div>
                <h1 className="text-white">Товары</h1>
            </div>
            <SearchProduct/>
            {devices.isLoading
                ? <Spinner animation={"grow"}/>
                :
                <>

                    <Table striped bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>Название</th>
                            <th>Изменить</th>
                            <th>Удалить</th>
                        </tr>
                        </thead>
                        <tbody>
                        {devices.devices.map(device =>

                            <Product key={device.id} device={device} updateDevice={() => setShowModal(true)}/>
                        )}
                        </tbody>
                    </Table>
                    <Pages
                        totalCount={devices.totalCount}
                        limit={devices.limit}
                        currentPage={devices.page}
                        setPage={page => devices.setPage(page)}/>
                </>

            }


            {devices.selectedDevice && <UpdateDevice show={showModal} onHide={onShowModal}/>}
        </Container>
    );
});

export default Products;