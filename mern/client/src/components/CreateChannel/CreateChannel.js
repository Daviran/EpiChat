import React, { useState } from 'react'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';


export default function CreateChannel() {

    const [salon, setSalon] = useState('')
    const [master, setMaster] = useState('')
    const [newChannel, setNewChannel] = useState([{
        name: '',
        creator: ''
    }])


    function handleClick() {
        console.log("hey");
        return setNewChannel({ name: salon, creator: master} );
    }

    function handleSubmit(event) {
        event.preventDefault();        
        console.log(newChannel);

        if(newChannel.length === 0) return alert("erreur")
        axios.post('http://localhost:5000/channel/add', newChannel);
        setNewChannel({
            name: '',
            creator: ''
        })
    }

    return (
        <div>
        <Container>
            <h1>Créer un salon</h1>
            <Form onSubmit={(event) => handleSubmit(event)}>
                <Row className="justify-content-md-center">
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="room">Nom du salon</Form.Label>
                        <Form.Control onChange={(event) => setSalon(event.target.value)} name="room" type="text" placeholder="Institutions du Royaume de France" />
                    </Form.Group>
                </Row>
                <Row className="justify-content-md-center">
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="creator">Créateur du salon</Form.Label>
                        <Form.Control onChange={(event) => setMaster(event.target.value)} name="creator" type="text" />
                    </Form.Group>
                </Row>
                <Button onClick={() => handleClick()} variant="primary" type="submit">Créer</Button>
            </Form>
        </Container>
      </div>
    )
}
