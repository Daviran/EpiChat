import React from "react";
import Container from "react-bootstrap/Container";
import { Navbar, Nav, NavDropdown} from "react-bootstrap";
export default class TheNav extends React.Component {
  render() {
    return (
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Menu</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav fill variant ="tabs" defaultActiveKey="/home">
              <Nav.Link href="#home">Accueil</Nav.Link>
              <Nav.Link href="#link">Créer un channel</Nav.Link>
              
              <NavDropdown title="Accéder aux channels" id="basic-nav-dropdown" >
                <NavDropdown.Item href="#action/3.1">Gaming</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.2">General</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.3">Chat</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
