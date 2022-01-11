import React, { useState } from 'react'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export default function EditChannel() {

    const history = useHistory();
    const redirection = () =>{ 
        history.goBack()
        console.log(history);
    }

    const idURL = useParams();

    const [salon, setSalon] = useState('');
    const [master, setMaster] = useState('')
    const [updatedChannel, setUpdatedChannel] = useState({
        name: '',
        creator: ''
    })

    function handleClick() {
        console.log(salon);
        console.log(master);
        setUpdatedChannel({ name: salon, creator: master})
    }

    function handleSubmit(event) {
        event.preventDefault();

        console.log(updatedChannel);

        axios.post('http://localhost:5000/update/' + idURL.id,
        updatedChannel);

        redirection();

    }

    return (
        <div>
        <Container>
            <h1>Editer un salon</h1>
            <Form onSubmit={(event) => handleSubmit(event)}>
                <Row className="justify-content-md-center">
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="room">Nom du salon</Form.Label>
                        <Form.Control onChange={(event) => setSalon(event.target.value)} name="room" type="text" />
                    </Form.Group>
                </Row>
                <Row className="justify-content-md-center">
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="creator">Créateur du salon</Form.Label>
                        <Form.Control onChange={(event) => setMaster(event.target.value)} name="creator" type="text" />
                    </Form.Group>
                </Row>
                <Button onClick={(event) => handleClick(event)} variant="primary" type='submit'>Créer</Button>
            </Form>
        </Container>
      </div>
    )
}
