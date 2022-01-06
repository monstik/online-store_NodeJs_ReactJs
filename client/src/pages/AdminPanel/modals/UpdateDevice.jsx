import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Col,
    Dropdown,
    Form, FormLabel,
    Image,
    Modal,
    Row,
    Spinner
} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {fetchTypes} from "../../../http/typesAPI";
import {fetchBrands} from "../../../http/brandsAPI";
import {updateDevice, fetchOneDevice} from "../../../http/devicesAPI";


const CreateDevice = observer(({show, onHide}) => {
    const {devices, types, brands, alertMessage, admin} = useContext(Context);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState(undefined);

    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(true);

    const [preview, setPreview] = useState();


    useEffect(() => {
        if (!devices.selectedDevice) {
            return
        }
        fetchOneDevice(devices.selectedDevice.id)
            .then(fetchDevice => {
                setName(fetchDevice.name);
                setPrice(fetchDevice.price);
                setPreview(process.env.REACT_APP_API_URL + fetchDevice.img);
                types.setSelectedType(types.types.find(type => type.id === fetchDevice.typeId));
                brands.setSelectedBrand(brands.brands.find(brand => brand.id === fetchDevice.brandId));
                let responseDeviceInfo = [];
                fetchDevice.info.map(fetchInfo => {

                    responseDeviceInfo.push({title: fetchInfo.title,
                        description: fetchInfo.description,
                        number: fetchInfo.id})

                })

                       setInfo(responseDeviceInfo);
                console.log('ale')
                     console.log(info)

            })
            .catch(e => alert(e?.response?.data?.message))
            .finally(() => setLoading(false));

    }, [devices.selectedDevice])

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
        console.log('ale')
        console.log(info)
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
        formData.append('id', devices.selectedDevice.id);
        formData.append('name', name);
        formData.append('price', price);
        formData.append('img', image);
        formData.append('typeId', types.selectedType.id);
        formData.append('brandId', brands.selectedBrand.id);
        formData.append('info', JSON.stringify(info));


        updateDevice(formData)
            .then(data => {
                alertMessage.setSuccessMessage(data.message);
                admin.setOnUpdate(true);
                onClose();
            })
            .catch(e => {
                alertMessage.setErrorMessage(e.response?.data?.message);
            })
    }

    const onClose = () => {
        setName('');
        setPrice(0);
        setInfo([]);
        setImage('');
        setPreview('');
        devices.setSelectedDevice(undefined)
        types.setSelectedType({});
        brands.setSelectedBrand({});
        onHide()
    }


    return (


        <Modal
            show={show}
            onHide={onClose}

            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить товар
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                {loading ?

                    <Spinner animation={"grow"}/>


                    :

                    <Form>
                        <Dropdown className="mt-2 mb-2">
                            <FormLabel className="w-25">Тип</FormLabel>
                            <Dropdown.Toggle
                                className="w-25">{types.selectedType.name || 'Выберите тип'}</Dropdown.Toggle>
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
                            <FormLabel className="w-25">Бренд</FormLabel>
                            <Dropdown.Toggle
                                className="w-25">{brands.selectedBrand.name || 'Выберите бренд'}</Dropdown.Toggle>
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
                }


            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onClose}>Отменить</Button>
                <Button variant={"success"} onClick={addDevice}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;