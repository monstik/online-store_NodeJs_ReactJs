import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Container, Form, FormLabel, Image} from "react-bootstrap";
import {Context} from "../../../index";
import {fetchUser} from "../../../http/userAPI";
import accountIcon from "../../../assets/accountIcon.png";
import editIcon from "../../../assets/editIcon.png";
import convertIcon from "../../../assets/convertIcon.png";
import DatePicker from "react-datepicker";

const Account = ({menuActiveHandler}) => {

    const {user} = useContext(Context);
    const [personalDataEdit, setPersonalDataEdit] = useState(false);
    const [contactsDataEdit, setContactsDataEdit] = useState(false);
    const [gender, setGender] = useState(user.user.gender);
    const [birthday, setBirthday] = useState(Date.parse(user.user.birthday));

    useEffect(() => {
        menuActiveHandler()

    }, [])

    const personalDataHandler = () => {
        setPersonalDataEdit(!personalDataEdit);
    }

    const contactsDataHandler = () => {
        setContactsDataEdit(!contactsDataEdit);
    }

    return (
        <>
            <h1>Личные данные</h1>
            <Card className={"mt-4"}>
                <div className={"d-flex align-items-center justify-content-between p-3"}>
                    <div className={"d-flex align-items-center"}>
                        <Image width={30} src={accountIcon}/>
                        <h3 className={"pl-3 mb-0"} style={{fontSize: 20}}>Личные данные</h3>
                    </div>
                    {!personalDataEdit &&
                    <Button
                        onClick={personalDataHandler}
                        variant={"outline-primary"}
                        className={"d-flex align-items-center"}>
                        <Image width={30} src={editIcon}/>
                        <h3 className={"pl-3 mb-0"} style={{fontSize: 18}}>Изменить</h3>
                    </Button>
                    }

                </div>
                <Form style={{padding: "20px 20px 20px 60px"}}>
                    <ul className={"d-flex flex-wrap p-0 "} style={{listStyleType: "none"}}>
                        <li className={"mr-5 mb-3 w-25"}>
                            <Form.Label className={"font-weight-bolder"}>Фамилия</Form.Label>

                            {personalDataEdit ?
                                <Form.Control value={user.user.middleName}/>
                                :
                                <p>{user.user.middleName}</p>
                            }


                        </li>

                        <li className={"mr-5 mb-3 w-25"}>
                            <Form.Label className={"font-weight-bolder"}>Имя</Form.Label>

                            {personalDataEdit ?
                                <Form.Control value={user.user.firstName}/>
                                :
                                <p>{user.user.firstName}</p>
                            }


                        </li>
                        <li className={"mr-5 mb-3 w-25"}>
                            <Form.Label className={"font-weight-bolder"}>Отчество</Form.Label>

                            {personalDataEdit ?
                                <Form.Control value={user.user.lastName}/>
                                :
                                <p>{user.user.lastName}</p>
                            }


                        </li>
                        <li className={"mr-5 mb-3 w-25"}>
                            <Form.Label className={"font-weight-bolder"}>Дата рождения</Form.Label>

                            {personalDataEdit ?
                                <DatePicker
                                    selected={birthday}
                                    onChange={(date) => setBirthday(date)}
                                    showYearDropdown
                                    showMonthDropdown
                                    yearDropdownItemNumber={15}
                                    dropdownMode="select"
                                    withPortal
                                />
                                :
                                <p>{user.user.birthday}</p>
                            }


                        </li>
                        <li className={"mr-5 mb-3 w-25 d-flex flex-column"}>
                            <Form.Label className={"font-weight-bolder"}>Пол</Form.Label>

                            {personalDataEdit ?

                                <Form.Select value={gender} onChange={event => setGender(event.target.value)}
                                             as="select">
                                    <option value="Женщина">Женщина</option>
                                    <option value="Мужчина">Мужчина</option>
                                </Form.Select>
                                :
                                <p>{user.user.gender}</p>
                            }


                        </li>
                    </ul>

                    {personalDataEdit &&
                    <div className={"d-flex"}>
                        <Button
                            onClick={personalDataHandler}
                            variant={"outline-danger"}
                            className={"d-flex align-items-center mr-4"}>

                            Сохранить
                        </Button>
                        <Button
                            onClick={personalDataHandler}
                            variant={"outline-dark"}
                            className={"d-flex align-items-center"}>

                            Отменить
                        </Button>
                    </div>
                    }


                </Form>


            </Card>

            <Card className={"mt-4"}>
                <div className={"d-flex align-items-center justify-content-between p-3"}>
                    <div className={"d-flex align-items-center"}>
                        <Image width={30} src={convertIcon}/>
                        <h3 className={"pl-3 mb-0"} style={{fontSize: 20}}>Контакты</h3>
                    </div>
                    {!personalDataEdit &&
                    <Button
                        onClick={contactsDataHandler}
                        variant={"outline-primary"}
                        className={"d-flex align-items-center"}>
                        <Image width={30} src={editIcon}/>
                        <h3 className={"pl-3 mb-0"} style={{fontSize: 18}}>Изменить</h3>
                    </Button>
                    }

                </div>
                <Form style={{padding: "20px 20px 20px 60px"}}>
                    <ul className={"d-flex flex-wrap p-0 "} style={{listStyleType: "none"}}>
                        <li className={"mr-5 mb-3 w-25"}>
                            <Form.Label className={"font-weight-bolder"}>Телфон</Form.Label>

                            {contactsDataEdit ?
                                <Form.Control value={user.user.phoneNumber}/>
                                :
                                <p>{user.user.phoneNumber}</p>
                            }


                        </li>
    {/*TODO нужно на бэкенде сделать строку в бд и логику добавление*/}
                        <li className={"mr-5 mb-3 w-25"}>
                            <Form.Label className={"font-weight-bolder"}>Дополнительный телефон</Form.Label>

                            {contactsDataEdit ?
                                <Form.Control value={user.user.phoneNumber}/>
                                :
                                <p>{user.user.phoneNumber}</p>
                            }


                        </li>
                        <li className={"mr-5 mb-3 w-25"}>
                            <Form.Label className={"font-weight-bolder"}>Email</Form.Label>

                            {contactsDataEdit ?
                                <Form.Control value={user.user.email}/>
                                :
                                <p>{user.user.email}</p>
                            }

                        </li>

                    </ul>

                    {Object.keys(user.user).map(key => <div key={key}>{key} - {user.user[key]}</div>)}
                    {contactsDataEdit &&
                    <div className={"d-flex"}>
                        <Button
                            onClick={contactsDataHandler}
                            variant={"outline-danger"}
                            className={"d-flex align-items-center mr-4"}>

                            Сохранить
                        </Button>
                        <Button
                            onClick={contactsDataHandler}
                            variant={"outline-dark"}
                            className={"d-flex align-items-center"}>

                            Отменить
                        </Button>
                    </div>
                    }


                </Form>


            </Card>

        </>
    );
};

export default Account;