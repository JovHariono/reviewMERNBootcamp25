import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { ContextApplication } from "../config/contexts";
import useJWT from "../hooks/useJWT";

const LibComponentNavbar = () => {
  const jwt = useJWT();
  const application = useContext(ContextApplication);

  const signOut = () => {
    jwt.signOut()
    application.setIsAuthenticated(false)
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary d-print-none">
      <Container>
        <Navbar.Brand href="#">Laundry Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {application.isAuthenticated && (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#/">Barang</Nav.Link>
              <Nav.Link href="#/terima">Terima</Nav.Link>
              <Nav.Link href="#/kas">Kas</Nav.Link>
              <Nav.Link onClick={signOut}>Log out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};

export default LibComponentNavbar;
