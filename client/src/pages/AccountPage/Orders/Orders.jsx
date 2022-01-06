import React, {useEffect} from 'react';

const Orders = ({menuActiveHandler}) => {

    useEffect(()=> {menuActiveHandler()})

    return (
        <div>
            Orders
        </div>
    );
};

export default Orders;