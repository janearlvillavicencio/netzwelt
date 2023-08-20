import { useContext } from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../UserContext';

export default function AppNavbar() {

    const{user} = useContext(UserContext);
    console.log(user);

    return (
    <Navbar expand="lg" className="custom-navbar font">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">netzwelt</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" spy="true">Home</Nav.Link>

            {
              (user.id !== null)?
              user.isAdmin
              ?
                <>
                  <Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
                </>
                :
                <>
                  <Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
                </>
                :
                <>
                  <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                  <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                </>
            }

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    )
};

