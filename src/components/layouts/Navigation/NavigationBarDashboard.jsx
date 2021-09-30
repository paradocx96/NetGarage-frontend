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
                        <Navbar.Brand href="/dashboard">Dashboard</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">

                            <Nav className="me-auto">
                                <NavDropdown title="Phones" id="collasible-nav-dropdown">
                                    {/*<NavDropdown.Item href="#">MOBILE</NavDropdown.Item>*/}
                                    <Link to={'/phoneInternal'} className={'dropdown-item'}>Phones</Link>
                                    <Link to={'/phones/addPhone'} className={'dropdown-item'}>Add Phones</Link>
                                    <Link to={'/phones/phoneActions'} className={'dropdown-item'}>Phone Actions</Link>
                                    <Link to={'/phonePdf'} className={'dropdown-item'}>Reports</Link>
                                </NavDropdown>

                                <NavDropdown title="Laptop" id="collasible-nav-dropdown">
                                    <Link to="/laptops-admin" className={'dropdown-item'}>Laptops</Link>
                                    <Link to="/laptops-admin-add" className={'dropdown-item'}>Add Laptop</Link>
                                    <Link to="/laptops-admin-categories" className={'dropdown-item'}>Sub Categories</Link>
                                </NavDropdown>

                                <NavDropdown title="User" id="collasible-nav-dropdown">
                                    <Link to="#" className={'dropdown-item'}>Users</Link>
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
