import React, {Component} from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';

class NavigationBar extends Component {
    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">HOME</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">

                            <Nav className="me-auto">
                                <NavDropdown title="MOBILE" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="/mobiles">Mobile</NavDropdown.Item>
                                    <NavDropdown.Item href="#">Mobile Finder</NavDropdown.Item>
                                </NavDropdown>

                                <NavDropdown title="LAPTOP" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="/laptops">Laptop</NavDropdown.Item>
                                    <NavDropdown.Item href="#">Laptop Finder</NavDropdown.Item>
                                </NavDropdown>

                                <Nav.Link href="/contact">CONTACT</Nav.Link>
                            </Nav>

                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default NavigationBar;
