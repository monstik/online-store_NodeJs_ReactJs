import React, {useContext, useEffect, useState} from 'react';
import {Alert, Button, Col, Dropdown, Form, Image, Modal, Row} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {fetchTypes} from "../../../http/typesAPI";
import {fetchBrands} from "../../../http/brandsAPI";
import {createDevice} from "../../../http/devicesAPI";
import AlertDismissible from "../../../components/AlertDismissible";

const CreateDevice = observer(({show, onHide}) => {
    const {device, types, brands, alertMessage} = useContext(Context);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');

    const [info, setInfo] = useState([]);

    const [preview, setPreview] = useState();

    useEffect(() => {
        if (!image) {
            setPreview(undefined)
            return
        }
        // create the preview
        const objectUrl = URL.createObjectURL(image)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [image])

    useEffect(() => {
        fetchTypes()
            .then(fetchTypes => types.setTypes(fetchTypes))
            .catch(e => alertMessage.setErrorMessage(e.response.data.message));
        fetchBrands()
            .then(fetchBrands => {

                brands.setBrands(fetchBrands)
            })
            .catch(e => alertMessage.setErrorMessage(e.response.data.message));
    }, [show]);

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    };

    const deleteInfo = (number) => {
        setInfo(info.filter(i => i.number !== number));
    };

    const selectFile = (event) => {
        setImage(event.target.files[0]);
    };

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i));
    };

    const addDevice = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('img', image);
        formData.append('typeId', types.selectedType.id);
        formData.append('brandId', brands.selectedBrand.id);
        formData.append('info', JSON.stringify(info));


        createDevice(formData)
            .then(data => {
                alertMessage.setSuccessMessage('Товар успешно добавлен!')
                setName('');
                setPrice(0);
                setInfo([]);
                setImage('');
                types.setSelectedType({});
                brands.setSelectedBrand({});
                onHide()
            })
            .catch(e => {
                alertMessage.setErrorMessage(e.response?.data?.message);
            })
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
                    Добавить устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{types.selectedType.name || 'Выберите тип'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {types.types.map(type =>
                                <Dropdown.Item
                                    onClick={() => types.setSelectedType(type)}
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{brands.selectedBrand.name || 'Выберите бренд'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {brands.brands.map(brand =>
                                <Dropdown.Item
                                    key={brand.id}
                                    onClick={() => brands.setSelectedBrand(brand)}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        onChange={(event => setName(event.target.value))}
                        value={name}
                        className="mt-3"
                        placeholder={"Ведите название устройства..."}
                    />
                    <Form.Control
                        onChange={(event => setPrice(event.target.value))}
                        value={price}
                        className="mt-3"
                        type="number"
                        placeholder={"Ведите цену..."}
                    />
                    <Image width={200} height={200} src={preview}/>
                    <Form.Control
                        onChange={(selectFile)}
                        className="mt-3"
                        type="file"
                    />
                    <hr/>
                    <Button
                        onClick={addInfo}
                    >
                        Добавить нове свойство
                    </Button>

                    {
                        info.map(i =>
                            <Row className="mt-4" key={i.number}>
                                <Col md={4}>
                                    <Form.Control
                                        onChange={(event) => changeInfo('title', event.target.value, i.number)}
                                        value={i.title}
                                        placeholder={"Введите название свойства"}
                                    />
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        onChange={(event) => changeInfo('description', event.target.value, i.number)}
                                        value={i.description}
                                        placeholder={"Введите описание свойства"}
                                    />
                                </Col>

                                <Col md={4}>
                                    <Button
                                        onClick={() => deleteInfo(i.number)}
                                        variant={"danger"}
                                    >
                                        Удалить
                                    </Button>
                                </Col>
                            </Row>)
                    }
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"success"} onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;