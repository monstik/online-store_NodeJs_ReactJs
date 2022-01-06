import {useContext, useEffect, useState} from "react";
import {Alert, Button, Image} from "react-bootstrap";
import {Context} from "../index";

function AlertDismissible() {

    const {alertMessage} = useContext(Context);
    useEffect(() => {
        setTimeout(() => {
            alertMessage.setIsVisible(false);
            alertMessage.setMessage('');
        }, 3000)
    })
    return (
        <Alert
            variant={alertMessage.isError ? "danger" : "success"}
            className='position-fixed d-flex flex-column justify-content-center align-items-center '
            style={{
                zIndex: 10000,
                width: '100%',

            }}
            onClose={() => alertMessage.setIsVisible(false)}
        >

            <Alert.Heading>{alertMessage.isError ? 'Oh shit! Ебаная ошибка!' : 'Oh shit! Ебаный успех!'}</Alert.Heading>
            <div className="justify-content-center">
                {alertMessage.message}
            </div>
        </Alert>
    );
}

export default AlertDismissible;