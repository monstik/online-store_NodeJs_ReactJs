import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";
import {fetchTypes} from "../http/typesAPI";

const TypeBar = observer(() => {
    const {types, devices} = useContext(Context);

    const typeHandler = (type) => {

        types.setSelectedType(type)
    }

    return (
        <ListGroup>
            {types.types.map(type =>
                <ListGroup.Item
                    style={{cursor: "pointer"}}
                    active={type.id === types.selectedType.id}
                    key={type.id}
                    onClick={() => typeHandler(type)}

                >{type.name}</ListGroup.Item>
            )}


        </ListGroup>
    );
});

export default TypeBar;