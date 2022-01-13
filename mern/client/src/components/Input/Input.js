import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import '../Input/Input.css'

export default function Input({ message, setMessage, sendMessage }) {
    return (
         <Form className='inputForm'>
            <Form.Control 
                className='input'
                type='text'
                placeholder='Ecrivez un message...'
                value={message} 
                onChange={(event) => setMessage(event.target.value)}
                onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null} 
            />
            <Button variant='primary' className='sendButton' onClick={(event) => sendMessage(event)} >Envoyer</Button>
         </Form>
    )
}
