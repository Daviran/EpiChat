import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

export default function InfoUser({ user }) {



    return (
        <ListGroup.Item>
            {user}
        </ListGroup.Item>
    )
}
