import React, {Component} from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';

class NavigationBarDashboard extends Component {

    backColor = {
        backgroundColor : '#283593',
        color: 'white'
    }

    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" style={this.backColor} variant="dark">
                    <Container>
                        <Navbar.Brand href="/dashboard">DASHBOARD</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">

                            <Nav className="me-auto">
                                <NavDropdown title="MOBILE" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="#">MOBILE</NavDropdown.Item>
                                </NavDropdown>

                                <NavDropdown title="LAPTOP" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="/laptops-admin">Laptops</NavDropdown.Item>
                                    <NavDropdown.Item href="/laptops-admin-add">Add Laptop</NavDropdown.Item>
                                </NavDropdown>

                                <NavDropdown title="USER" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="#">Users</NavDropdown.Item>
                                </NavDropdown>

                            </Nav>

                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default NavigationBarDashboard;
