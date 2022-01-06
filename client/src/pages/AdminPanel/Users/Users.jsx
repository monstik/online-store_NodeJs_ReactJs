import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Dropdown, Form, InputGroup, Table} from "react-bootstrap";
import {Context} from "../../../index";
import {fetchUsers} from "../../../http/userAPI";
import {observer} from "mobx-react-lite";
import Pages from "../../../components/Pages";
import UserTableItem from "./UserTableItem";

const Users = observer( () => {
    const {admin, user, alertMessage} = useContext(Context);


    useEffect(() => {
        fetchUsers(user.page, user.limit)
            .then(fetchUsers => {
                user.setTotalCount(fetchUsers.count);
                user.setUsers(fetchUsers.rows);
            })
            .catch(e => alertMessage.setErrorMessage(e.response?.data?.message))
            .finally(() => admin.setOnUpdate(false));
    },[user.page, admin.onUpdate]);


    return (
        <Container className="p-0 m-0">
            <div>
                <h1 className="text-white">Пользователи</h1>
            </div>
            <InputGroup className="w-50 mt-4 mb-4">
                <Form.Control placeholder={'Поиск пользователей...'} />
                <Button>Найти</Button>
            </InputGroup>
            <Table striped bordered hover variant="dark" >
                <thead>
                <tr>
                    <th>id</th>
                    <th>Email</th>
                    <th>Имя</th>
                    <th>Роль</th>
                </tr>
                </thead>
                <tbody>
                {user.users.map((user) =>

                           <UserTableItem key={user.id} user={user}/>


                )}
                </tbody>
            </Table>

            <Pages totalCount={user.totalCount} limit={user.limit} currentPage={user.page} setPage={page => user.setPage(page)}/>
        </Container>

    );
});

export default Users;