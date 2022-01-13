import React, { useState } from 'react'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import Alert from 'react-bootstrap/Alert';


export default function EditChannel({ location }) {

    const history = useHistory();
    const redirection = () =>{ 
        history.goBack()
        console.log(history);
    }

    const idURL = useParams();
    const { room, creator } = queryString.parse(location.search);

    const [creation, setCreation] = useState(null);
    const [show, setShow] = useState(false);
    const [salon, setSalon] = useState('');
    const [master, setMaster] = useState('')
    const [img, setImage] = useState('')
    const [updatedChannel, setUpdatedChannel] = useState({
        name: '',
        creator: '',
        img: ''
    })

    function handleClick() {
        console.log(salon);
        console.log(master);
        setUpdatedChannel({ name: salon, creator: master, img: img})
    }

    function handleSubmit(event) {
        event.preventDefault();

        setCreation(`Salon ${salon} édité !`);
        setShow(true);

        console.log(updatedChannel);

        axios.post('http://localhost:5000/update/' + idURL.id,
        updatedChannel);

        redirection();

    }

    return (
        <Container className='edit-container'>
            <h1>Editer un salon</h1>
            <Form onSubmit={(event) => handleSubmit(event)}>
                <Row className="justify-content-md-center">
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="room">Nom du salon</Form.Label>
                        <Form.Control onChange={(event) => setSalon(event.target.value)} name="room" type="text" placeholder={room} />
                    </Form.Group>
                </Row>
                <Row className="justify-content-md-center">
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="image">Logo du salon</Form.Label>
                        <Form.Control onChange={(event) => setImage(event.target.files[0].name)} name="img" type="file" id='image'/>
                    </Form.Group>
                </Row>
                <Row className="justify-content-md-center">
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="creator">Créateur du salon</Form.Label>
                        <Form.Control onChange={(event) => setMaster(event.target.value)} name="creator" type="text" placeholder={creator}/>
                    </Form.Group>
                </Row>
                <Button onClick={(event) => handleClick(event)} variant="primary" type='submit'>Editer</Button>
            </Form>
            { show ? (<Alert className='edit-container__alert' variant="success">{creation}Revenir à l'<Alert.Link href='/'>accueil</Alert.Link>.</Alert>) : null }
        </Container>
    )
}
