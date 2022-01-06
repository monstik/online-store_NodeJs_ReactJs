import React, {useContext, useState} from 'react';
import {Button, Col, Dropdown, Row} from "react-bootstrap";
import {updateUserRole} from "../../../http/userAPI";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";

const UserTableItem = observer( ({user}) => {
    const [role, setRole] = useState(user.role);
    const {alertMessage, admin} = useContext(Context);

    const onItemClick = (value) => {
        setRole(value);
    }

    const onUpdateClick = () => {
        updateUserRole(user.id, role)
            .then(data => {
                alertMessage.setSuccessMessage(data.message);
                admin.setOnUpdate(true);
            })
            .catch(e => alertMessage.setErrorMessage('Ошибка обновления пользователя'));
    }

    return (

        <tr >
            <td>{user.id}</td>
            <td>{user.email}</td>
            <td>{user.name}</td>
            <td className="d-flex justify-content-center">

                    <Dropdown>
                        <Dropdown.Toggle style={{width:100}} variant={role === 'ADMIN' ? "danger" : "primary"} id="dropdown-basic">
                            {role}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => onItemClick('ADMIN')}>ADMIN</Dropdown.Item>
                            <Dropdown.Item onClick={() => onItemClick('USER')}>USER</Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown>

                    <Button variant="success" onClick={onUpdateClick} className="ml-5">
                        Обновить
                    </Button>



                </td>
        </tr>
    );
});

export default UserTableItem;