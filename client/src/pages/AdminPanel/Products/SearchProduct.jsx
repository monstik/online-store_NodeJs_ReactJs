import React, {useContext, useEffect, useState} from 'react';
import {fetchDevices, searchDevices} from "../../../http/devicesAPI";
import {Context} from "../../../index";
import {Button, Form, InputGroup} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const SearchProduct = observer( () => {

    const {admin, devices, alertMessage, types, brands} = useContext(Context);
    const [searchTimeOut, setSearchTimeOut] = useState(false);


    useEffect(() => {
        if (searchTimeOut) {
            clearTimeout(searchTimeOut);
        }

        if (devices.search !== '') {
            if (devices.isSearch) {
                devices.setIsLoading(true);
                devices.setIsSearch(false)
                setSearchTimeOut(setTimeout((value) => {

                    searchDevices(value,types.selectedType.id || null, brands.selectedBrand.id || null, devices.page, devices.limit).then(fetchDevices => {
                        devices.setTotalCount(fetchDevices.count);
                        devices.setDevices(fetchDevices.rows);
                    }).catch(e => alertMessage.setErrorMessage(e.response?.data?.message))
                        .finally(() => {
                            devices.setIsLoading(false);

                        });
                }, 300, devices.search))
            } else {

                devices.setIsLoading(true);

                searchDevices(devices.search, types.selectedType.id || null, brands.selectedBrand.id || null, devices.page, devices.limit)
                    .then(fetchDevices => {
                        devices.setTotalCount(fetchDevices.count);
                        devices.setDevices(fetchDevices.rows);
                    })
                    .catch(e => alertMessage.setErrorMessage(e.response?.data?.message))
                    .finally(() => {
                        devices.setIsLoading(false);
                    });
            }


        } else {

            fetchDevices(types.selectedType.id || null, brands.selectedBrand.id || null, devices.page, devices.limit)
                .then(fetchDevices => {
                    devices.setTotalCount(fetchDevices.count);
                    devices.setDevices(fetchDevices.rows);

                })
                .catch(e => alertMessage.setErrorMessage(e.response?.data?.message))
                .finally(() => {
                    devices.setIsLoading(false);
                    admin.setOnUpdate(false)
                });

        }
    }, [devices.search, devices.page, types.selectedType, brands.selectedBrand, admin.onUpdate])


    const onSearchChange = (event) => {
        devices.setSearch(event.target.value);
        devices.setIsSearch(true)
        devices.setIsLoading(true);

    }

    return (
        <InputGroup className="w-50 mt-4 mb-4">
            <Form.Control onChange={onSearchChange} value={devices.search} placeholder={'Поиск товара...'}/>
            <Button>Найти</Button>
        </InputGroup>
    );
});

export default SearchProduct;