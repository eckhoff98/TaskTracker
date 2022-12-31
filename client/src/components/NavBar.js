import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

function NavBar({ logout, user }) {
    const LoginRegister = () => {
        if (user) {
            return (
                <>
                    <NavDropdown title={user.extraInfo ? user.extraInfo.name : user.email} id="collasible-nav-dropdown" >
                        <NavDropdown.Item eventKey="6" as={Link} to="/account">Account</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item eventKey="7" as={Link} to="/" onClick={() => { logout() }}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </>
            )
        } else {
            return (
                <>
                    <Nav.Link eventKey="1" as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link eventKey="2" as={Link} to="/register">Register</Nav.Link>
                </>
            )
        }
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">Task Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link eventKey="3" as={Link} to="/tasks">Tasks</Nav.Link>
                        <Nav.Link eventKey="4" as={Link} to="/about">About</Nav.Link>

                        {/* Example code */}
                        {/* <Nav.Link eventKey="5" as={Link} to="/more">More stuff</Nav.Link>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown> */}

                    </Nav>
                    <Nav>
                        <LoginRegister />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;