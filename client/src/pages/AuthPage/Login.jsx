import React, {useContext, useState} from 'react';
import {Button, Card, Form, Row} from "react-bootstrap";
import {NavLink, useHistory} from "react-router-dom";
import {REGISTRATION_ROUTE, SHOP_ROUTE} from "../../utils/consts";
import {login} from "../../http/userAPI";
import {Context} from "../../index";

const Login = () => {
    const {user} = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const signIn = async () => {
        try{
            const data = await login(email, password);
            user.setUser(data);
            user.setIsAuth(true);
            history.push(SHOP_ROUTE);
        } catch (e) {
            alert(e.response.data.message)
        }

    }

    return (
        <Card style={{width: 600}} className="p-5">
            <h2 className="m-auto">Авторизация</h2>
            <Form className="d-flex flex-column">
                <Form.Control
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                    type="email"
                    className="mt-3"
                    placeholder="Введите email..."
                />
                <Form.Control
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                    type="password"
                    className="mt-3"
                    placeholder="Введите пароль..."
                />
                <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                    <div>
                        Нет аккаунта?<NavLink to={REGISTRATION_ROUTE}>Зарегестрируйся!</NavLink>
                    </div>
                    <Button
                        onClick={signIn}
                        variant={"outline-dark"}
                    >
                        Войти
                    </Button>
                </Row>
            </Form>
        </Card>
    );
};

export default Login;