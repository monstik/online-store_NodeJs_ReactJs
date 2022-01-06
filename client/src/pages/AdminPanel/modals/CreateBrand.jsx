import React, {useContext, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";

import {createBrand} from "../../../http/brandsAPI";
import {Context} from "../../../index";

const CreateBrand = ({show, onHide}) => {

    const [brand, setBrand] = useState('');
    const {alertMessage} = useContext(Context);

    const addBrand = () => {
        createBrand({name: brand})
            .then(data => {
                setBrand('');
                alertMessage.setSuccessMessage('Бренд усепешно добавлен =D');
                onHide();
            })
            .catch(e => alertMessage.setErrorMessage(e.response.data.message));
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить бренд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        onChange={event => setBrand(event.target.value)}
                        value={brand}
                        placeholder={"Ведите название бренда..."}
                    />


                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"success"} onClick={addBrand}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrand;