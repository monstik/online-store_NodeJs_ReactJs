import React, {useContext, useEffect, useState} from 'react';
import {Button, ButtonGroup, Image} from "react-bootstrap";
import accountIcon from "../../../assets/accountIcon.png";
import ordersIcon from "../../../assets/ordersIcon.gif";
import heartIcon from "../../../assets/heartIcon.png";
import feedbackIcon from "../../../assets/feedbackIcon.png";
import {Context} from "../../../index";
import {FEEDBACK_ROUTE, LIKES_ROUTE, ORDERS_ROUTE, PERSONAL_INFORMATION_ROUTE} from "../../../utils/consts";
import {useHistory} from "react-router-dom";
import {fetchUser} from "../../../http/userAPI";

const AccountNavBar = ({radioValue}) => {

    const {user} = useContext(Context);
    const history = useHistory();


    const menuHandler = (event) => {
        history.push(event.currentTarget.value)
    }

    return (
        <ButtonGroup vertical className={"w-100"}>

            <Button
                onClick={menuHandler}
                value={PERSONAL_INFORMATION_ROUTE}
                type={"radio"}
                variant={"outline-primary"}
                className={"d-flex align-items-center w-100 pl-5"}
                active={radioValue === PERSONAL_INFORMATION_ROUTE}
            >
                <Image width={30} src={accountIcon}/>
                <div className={"text-left ml-3"}>
                    <div>
                        {user.user.middleName + " " + user.user.firstName}
                    </div>
                    <div>
                        {user.user.email}
                    </div>
                </div>

            </Button>
            <Button
                onClick={menuHandler}
                value={ORDERS_ROUTE}
                variant={"outline-primary"}
                className={"d-flex align-items-center w-100 pl-5"}
                active={radioValue === ORDERS_ROUTE}
            >
                <Image width={30} src={ordersIcon}/>
                <div className={"ml-3"}>Мои заказы</div>
            </Button>

            <Button
                onClick={menuHandler}
                value={LIKES_ROUTE}
                variant={"outline-primary"}
                className={"d-flex align-items-center w-100 pl-5"}
                active={radioValue === LIKES_ROUTE}
            >
                <Image width={30} src={heartIcon}/>
                <div className={"ml-3"}>Список желаний</div>
            </Button>

            <Button
                onClick={menuHandler}
                value={FEEDBACK_ROUTE}
                variant={"outline-primary"}
                className={"d-flex align-items-center w-100 pl-5"}
                active={radioValue === FEEDBACK_ROUTE}
            >
                <Image width={30} src={feedbackIcon}/>
                <div className={"ml-3"}>Мои отзывы</div>
            </Button>
        </ButtonGroup>
    );
};

export default AccountNavBar;