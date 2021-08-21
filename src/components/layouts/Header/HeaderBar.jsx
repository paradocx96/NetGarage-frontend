import React, {Component} from 'react';
import {Button, Container, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';

import Logo from './../../../assets/images/Header/logo.svg';
import ServiceUser from "../../../services/ServiceUser";
import {Link} from "react-router-dom";
class HeaderBar extends Component {

    backColor = {
        backgroundColor: '#4CAF50',
        color: 'white'
    }
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);

        this.state = {
            currentUser: undefined,
        };
    }
    componentDidMount() {
        const user = ServiceUser.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
            });
        }
    }

    logout() {
        ServiceUser.logout();
    }

    render() {
        const {currentUser} = this.state;
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" style={this.backColor} variant="dark">
                    <Container>
                        <Navbar.Brand href="/">
                            <img
                                src={Logo}
                                width="50"
                                height="50"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                            />{' '}
                            NetGarage
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                            </Nav>
                            <Form className="d-flex">
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="mr-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-light">Search</Button>
                            </Form>
                            <Nav>
                                {/*<Nav.Link href="/register">REGISTER</Nav.Link>*/}
                                {/*<Nav.Link eventKey={2} href="/login">*/}
                                {/*    LOGIN*/}
                                {/*</Nav.Link>*/}

                                {currentUser ? (
                                    <div className="navbar-nav ml-auto">

                                        <li className="nav-item">
                                            <Link to={'/'} className={'nav-link'} > {currentUser.username}</Link>
                                        </li>

                                        <li className="nav-item">
                                            <a href="/" className="nav-link" onClick={this.logout}>
                                                Logout
                                            </a>
                                        </li>
                                    </div>
                                ) : (

                                    <div className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <Link to={"/register"} className="nav-link"> Register </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={"/login"} className="nav-link"> Sign in </Link>
                                        </li>
                                    </div>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default HeaderBar;
