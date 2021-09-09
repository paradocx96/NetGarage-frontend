import React, {Component} from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";

class NavigationBar extends Component {

    backColor = {
        backgroundColor : '#4CAF50',
        color: 'white'
    }

    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" style={this.backColor} variant="dark">
                    <Container>
                        <Navbar.Brand href="/">HOME</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">

                            <Nav className="me-auto">
                                <NavDropdown title="Phones" id="collasible-nav-dropdown">
                                    <Link to={'/phones'} className={'dropdown-item'}>Phones</Link>
                                    <Link to={'/phones'} className={'dropdown-item'}>Phones Finder</Link>
                                    {/*<NavDropdown.Item href="/phones/chipsets/viewAll">Mobile Finder</NavDropdown.Item>*/}
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
