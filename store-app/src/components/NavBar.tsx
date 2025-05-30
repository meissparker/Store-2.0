import React, { useEffect, useState } from 'react';
import { Nav, Navbar, Container, Button } from 'react-bootstrap';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const NavBar: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

    const handleLogout = async () => {
      await signOut(auth);
      setUser(null);
      navigate('/');
    };

    const hideLinks = location.pathname === '/login' || location.pathname === '/register';
  return (
    <Navbar bg="light" expand="lg" variant="light" className="shadow-sm mb-3">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold">
          The Clothing Outlet
        </Navbar.Brand>


      {!hideLinks && (
        <>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Products</Nav.Link>
            <Nav.Link as={NavLink} to="/cart">Shopping Cart</Nav.Link>
            <Nav.Link as={NavLink} to="/profile">User Profile</Nav.Link>
            <Nav.Link as={NavLink} to="/admin/products">Manage Products</Nav.Link>
            <Nav.Link as={NavLink} to="/orders">Orders</Nav.Link>
          </Nav>

          <Nav className="ms-auto">
            {user ? (
              <>
              <Button variant="outline-danger" size="sm" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <Nav.Link as={NavLink} to ="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
        </>
      )}
      </Container>
    </Navbar>
  );
};

export default NavBar;