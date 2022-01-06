import React, {useContext} from 'react';
import {Context} from "../index";
import {Pagination} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const Pages = observer(({totalCount, limit, currentPage, setPage}) => {

    const {devices} = useContext(Context);
    const pagesCount = Math.ceil(totalCount / limit);
    const pages = []

    for (let i = 0; i < pagesCount; i++) {
        pages.push(i + 1)
    }


    return (
        <Pagination className="mt-4">
            {pages.map(page =>
                <Pagination.Item

                    key={page}
                    activeLabel=''
                    active={currentPage === page}
                    onClick={() => setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}

        </Pagination>
    );
});

export default Pages;