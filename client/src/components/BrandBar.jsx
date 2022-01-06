import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";
import {fetchBrands} from "../http/brandsAPI";

const BrandBar = observer(() => {
    const {brands} = useContext(Context);

    return (
        <Row className="d-flex">
            {brands.brands.map(brand =>
                <Card
                    className="p-3 ml-2"
                    key={brand.id}
                    onClick={() => brands.setSelectedBrand(brand)}

                    bg={brand.id === brands.selectedBrand.id ? 'danger' : 'secondary'}
                    style={{cursor: "pointer", color: '#fff'}}
                >
                    {brand.name}
                </Card>
            )}
        </Row>
    );
});

export default BrandBar;