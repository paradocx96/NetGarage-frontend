import React, {Component} from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";

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
                                <NavDropdown title="Phones" id="collasible-nav-dropdown">
                                    {/*<NavDropdown.Item href="#">MOBILE</NavDropdown.Item>*/}
                                    <Link to={'/phoneInternal'} className={'dropdown-item'}>Phones</Link>
                                    <Link to={'/phones/addPhone'} className={'dropdown-item'}>Add Phones</Link>
                                    <Link to={'/phones/phoneActions'} className={'dropdown-item'}>Phone Actions</Link>
                                </NavDropdown>

                                <NavDropdown title="LAPTOP" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="/laptops-admin">Laptops</NavDropdown.Item>
                                    <NavDropdown.Item href="/laptops-admin-add">Add Laptop</NavDropdown.Item>
                                    <NavDropdown.Item href="/laptops-admin-categories">Sub Categories</NavDropdown.Item>
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
