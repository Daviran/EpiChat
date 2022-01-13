import React, { useState } from 'react'
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'


import './Channel.css';

export default function Channel({room, creator, id, img, deleteChannel}) {

    const [pseudo, setPseudo] = useState('')

    function handleClick(id) {
        deleteChannel(id);
    }

    function handleJoinClick(event) {
        if(!pseudo || !room) {
            event.preventDefault();
            alert("Veuillez renseigner un pseudo !")
        }
        else {
            return
        }
    
    }

    return (
        <Card className='channel' style={{ width: '18rem' }}>
            {img !== '' ? (<Card.Img className='channel__img' src={img} />) : null}
            <Card.Header>
                <Card.Title>{room}</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>Salon de {creator}</Card.Subtitle>
            </Card.Header>
            <Card.Body>
            <div>
                <Form.Control className='channel__input' as='input' onChange={(event) => setPseudo(event.target.value)} placeholder='Pseudo' type='text' />
                <Link onClick={(event) => handleJoinClick(event)} to={`/chat/${id}?pseudo=${pseudo}&room=${room}`}>
                    <Button className='channel__button' variant='primary'>Joindre le chat</Button>
                </Link>
            </div>
            <p className='channel__link'>
                <Link to={`/edit/${id}?room=${room}&creator=${creator}`}>Edit</Link>
                <a href='/' onClick={() => handleClick(id)}>Supprimer</a>
            </p>
            </Card.Body>
        </Card>
    )
}
