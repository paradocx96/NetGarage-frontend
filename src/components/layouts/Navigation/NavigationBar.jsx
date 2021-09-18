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
                        <Link to={'/'} className={'navbar-brand'}>HOME</Link>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">

                            <Nav className="me-auto">
                                <NavDropdown title="PHONE" id="collasible-nav-dropdown">
                                    <Link to={'/phones/main'} className={'dropdown-item'}>Phones</Link>
                                    <Link to={'/phones/filter/publishedFilterMain'} className={'dropdown-item'}>Phones Finder</Link>
                                    {/*<NavDropdown.Item href="/phones/chipsets/viewAll">Mobile Finder</NavDropdown.Item>*/}
                                </NavDropdown>

                                <NavDropdown title="LAPTOP" id="collasible-nav-dropdown">
                                    <Link to={'/laptops'} className={'dropdown-item'}>Laptop</Link>
                                    <Link to={'/laptops'} className={'dropdown-item'}>Laptop Finder</Link>
                                </NavDropdown>

                                <Link to={'/contact'} className={'nav-link'} >CONTACT</Link>
                            </Nav>

                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default NavigationBar;
