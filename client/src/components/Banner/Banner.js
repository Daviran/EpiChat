import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import './Banner.css';


const Banner = () => {
    return (
            <div>
                <Navbar className="navBar" bg="dark" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Brand href="/">
                        <img
                            alt=""
                            src="/logo.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />
                        Démocratie Participative
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/">Accueil</Nav.Link>
                                <Nav.Link href="create">Créer un salon</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
    )
}

export default Banner