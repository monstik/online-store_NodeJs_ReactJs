import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row, Spinner} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchDevices} from "../http/devicesAPI";
import {fetchTypes} from "../http/typesAPI";
import {fetchBrands} from "../http/brandsAPI";
import Pages from "../components/Pages";
import SearchProduct from "./AdminPanel/Products/SearchProduct";

const ShopPage = observer(() => {
    const {types, brands, devices} = useContext(Context);
    useEffect(() => {
        fetchTypes()
            .then(fetchTypes => types.setTypes(fetchTypes))
            .catch(e => alert(e.response.data.message));
        fetchBrands()
            .then(fetchBrands => brands.setBrands(fetchBrands))
            .catch(e => alert(e.response.data.message));

    }, []);


    return (
        <Container fluid>
            <Row className="mt-4">
                <Col md={2}>
                    <TypeBar/>
                </Col>
                <Col md={10}>
                    <SearchProduct/>
                    <BrandBar/>
                    {devices.isLoading ?
                        <Container className="d-flex justify-content-center align-items-center"
                                   style={{height: '50vh'}}>
                            <Spinner animation={"grow"}/>
                        </Container>
                        :
                        <>
                            <DeviceList/>
                            <Pages totalCount={devices.totalCount} limit={devices.limit} currentPage={devices.page}
                                   setPage={(page) => devices.setPage(page)}/>
                        </>
                    }
                </Col>
            </Row>
        </Container>
    );
});

export default ShopPage;