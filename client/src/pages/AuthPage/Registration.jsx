import React, {useContext, useState} from 'react';
import {Button, Card, Col, Form, FormLabel, Row} from "react-bootstrap";
import {NavLink, useHistory} from "react-router-dom";
import {LOGIN_ROUTE, SHOP_ROUTE} from "../../utils/consts";
import {registration} from "../../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import 'react-phone-number-input/style.css'
import PhoneInput, {formatPhoneNumberIntl, isValidPhoneNumber} from 'react-phone-number-input'

const Registration = observer(() => {
    const {user, alertMessage} = useContext(Context);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('Мужчина');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [birthday, setBirthday] = useState(new Date());
    const history = useHistory();

    const register = async () => {
        try {
            if (!isValidPhoneNumber(phone)) {
                alertMessage.setErrorMessage('Не валидный номер телефона')
                return;
            }

            const formData = new FormData();
            formData.append('email', email);
            formData.append('firstName', firstName);
            formData.append('middleName', middleName);
            formData.append('lastName', lastName);
            formData.append('phoneNumber', formatPhoneNumberIntl(phone));
            formData.append('password', password);
            formData.append('repeatPassword', repeatPassword);
            formData.append('gender', gender);
            formData.append('birthday', birthday)
            const data = await registration(formData);
            user.setUser(data);
            user.setIsAuth(true);
            history.push(SHOP_ROUTE);
            alertMessage.setSuccessMessage('Регистрация прошла успешно =D');


        } catch (e) {
            alertMessage.setErrorMessage(e.response.data.message)
        }

    }

    return (
        <Card style={{width: 1000}} className="p-5">
            <h2 className="m-auto">Регистрация</h2>
            <Form className="d-flex flex-column">
                <Row>


                    <Col md={6}>
                        <Row>
                            <Form.Control
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value)}
                                className="mt-3"
                                type="text"
                                placeholder="Имя..."
                            />
                            <Form.Control
                                value={middleName}
                                onChange={(event => setMiddleName(event.target.value))}
                                className="mt-3"
                                type="text"
                                placeholder="Фамилия..."
                            />
                            <Form.Control
                                value={lastName}
                                onChange={event => setLastName(event.target.value)}
                                className="mt-3"
                                type="text"
                                placeholder="Отчество..."
                            />
                        </Row>
                        <Row className="mt-3">
                            <Col className="" md={4}>
                                <FormLabel>Пол</FormLabel>
                                <Form.Select value={gender} onChange={event => setGender(event.target.value)}
                                             as="select">
                                    <option value="Женщина">Женщина</option>
                                    <option value="Мужчина">Мужчина</option>
                                </Form.Select>
                            </Col>
                            <Col md={8}>
                                <FormLabel>Дата рождения</FormLabel>
                                <DatePicker
                                    selected={birthday}
                                    onChange={(date) => setBirthday(date)}
                                    showYearDropdown
                                    showMonthDropdown
                                    yearDropdownItemNumber={15}
                                    dropdownMode="select"
                                    withPortal
                                />
                            </Col>


                        </Row>

                    </Col>
                    <Col md={6}>
                        <PhoneInput
                            value={phone}
                            onChange={setPhone}
                            international
                            countryCallingCodeEditable={false}
                            initialValueFormat="national"
                            defaultCountry="UA"
                            className="mt-3"
                            type="phone"
                            placeholder="Номер телефона..."
                        />
                        <Form.Text className="text-muted">
                            {phone ? (isValidPhoneNumber(phone) ? 'Ok' : 'Invalid phone number') : 'Phone number required'}
                        </Form.Text>

                        <Form.Control
                            onChange={(event) => setEmail(event.target.value)}
                            className="mt-3"
                            value={email}
                            type="email"
                            placeholder="Введите email..."
                        />

                        <Form.Control
                            onChange={(event) => setPassword(event.target.value)}
                            value={password}
                            className="mt-3"
                            type="password"
                            placeholder="Введите пароль..."
                        />
                        <Form.Control
                            onChange={(event) => setRepeatPassword(event.target.value)}
                            value={repeatPassword}
                            className="mt-3"
                            type="password"
                            placeholder="Введите пароль еще раз..."
                        />
                    </Col>
                </Row>
                <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                    <div>
                        Есть аккаунта?<NavLink to={LOGIN_ROUTE}>Войти!</NavLink>
                    </div>
                    <Button
                        onClick={register}
                        variant={"outline-dark"}
                    >
                        Регистрация
                    </Button>
                </Row>
            </Form>
        </Card>
    );
});

export default Registration;