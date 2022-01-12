import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

export default function InfoUser({ user }) {



    return (
        <ListGroup.Item>
            <h1>Bonjour</h1>
            <p style={{color: "black"}}>{user}</p>
            {console.log(user)}
        </ListGroup.Item>
    )
}
