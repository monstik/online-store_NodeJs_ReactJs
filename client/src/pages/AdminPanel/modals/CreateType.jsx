import React, {useContext, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createType} from "../../../http/typesAPI";
import {Context} from "../../../index";

const CreateType = ({show, onHide}) => {

    const [type, setType] = useState('');
    const {types, alertMessage} = useContext(Context);


    const addType = () => {
        createType({name: type})
            .then(data => {
                setType('');
                alertMessage.setSuccessMessage('Тип усепешно добавлен =D');
                onHide();
            })
            .catch(e => {
                alertMessage.setErrorMessage(e.response.data.message)
            });
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
                    Добавить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        onChange={(event) => setType(event.target.value)}
                        value={type}
                        placeholder={"Ведите название типа..."}
                    />


                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"success"} onClick={addType}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;