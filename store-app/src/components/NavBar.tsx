import { Nav, Navbar, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <Navbar bg="light" expand="lg" variant="light" className="shadow-sm mb-3">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold">
          The Clothing Outlet
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/cart">Shopping Cart</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;