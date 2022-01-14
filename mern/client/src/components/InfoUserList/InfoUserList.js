import React, { useState, useEffect } from 'react';
import InfoUser from '../InfoUser/InfoUser';
import ListGroup from 'react-bootstrap/ListGroup';

import '../InfoUserList/InfoUserList.css';

export default function InfoUserList({ pseudos }) {


    function handleClick(event) {
        event.preventDefault();
    }

    return (
        <ListGroup className='infoUserList'>
            <button onClick={(event) => handleClick(event)}>click</button>
        </ListGroup>
    )
}
