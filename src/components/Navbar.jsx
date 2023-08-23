import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function WeatherNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary fs-4">
      <Container>
        <Navbar.Brand className="fs-3" href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            <Nav.Link className="px-3" href="/playground">Playground</Nav.Link>
            <Nav.Link className="px-3" href="/weather">Weather</Nav.Link>
            <Nav.Link className="px-3" href="/predict">Predict</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default WeatherNavbar;