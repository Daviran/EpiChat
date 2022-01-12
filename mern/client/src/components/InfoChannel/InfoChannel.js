import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';

export default function InfoChannel({ id, img, room, creator, pseudo }) {
    return (
        <ListGroup.Item action href={`/chat/${id}/?pseudo=${pseudo}&room=${room}`}>
            <h3>infochannels</h3>
            <span>{img}</span><span>{room}</span>
        </ListGroup.Item>
    )
}
