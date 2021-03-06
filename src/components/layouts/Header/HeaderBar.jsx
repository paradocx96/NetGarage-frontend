import React, {Component} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';

import Logo from './../../../assets/images/Header/netgarage.png';
import LogoNew from './../../../assets/images/Header/logo.png';
import ServiceUser from "../../../services/ServiceUser";
import {Link} from "react-router-dom";
import "react-icons/bs";

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
            adminDashboard: "",
            editorDashboard: "",
        };
    }

    componentDidMount() {
        const user = ServiceUser.getCurrentUser();
        if (user) {
            this.setState({
                currentUser: user,
                adminDashboard: user.roles.includes("ROLE_ADMIN"),
                editorDashboard: user.roles.includes("ROLE_EDITOR"),
            });
        }
    }

    logout() {
        ServiceUser.logout();
    }

    render() {
        const {currentUser, adminDashboard, editorDashboard,} = this.state;
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" style={this.backColor} variant="dark">
                    <Container>
                        <Navbar.Brand href="/">
                            <img
                                src={LogoNew}
                                height="60"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                            />
                            <img
                                src={Logo}
                                height="75"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                            />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                            </Nav>
                            {/*<Form className="d-flex">*/}
                            {/*    <FormControl*/}
                            {/*        type="search"*/}
                            {/*        placeholder="Search"*/}
                            {/*        className="mr-2"*/}
                            {/*        aria-label="Search"*/}
                            {/*    />*/}
                            {/*    <Button variant="outline-light">Search</Button>*/}
                            {/*</Form>*/}

                            <Nav>
                                {currentUser ? (
                                    <div className="navbar-nav ml-auto">
                                        {adminDashboard && (
                                            <li className="nav-item text-uppercase">
                                                <Link to={'/dashboard'} className={'nav-link'}> Dashboard </Link>
                                            </li>
                                        )}
                                        {editorDashboard && (
                                            <li className="nav-item">
                                                <Link to={'/dashboard'} className={'nav-link'}> Dashboard </Link>
                                            </li>
                                        )}
                                        <li className="nav-item text-uppercase">
                                            <Link to={'/view-profile'}
                                                  className={'nav-link BsBackspaceReverse'}> {currentUser.username}</Link>
                                        </li>
                                        <li className="nav-item text-uppercase">
                                            <a href="/" className="nav-link" onClick={this.logout}>
                                                Logout
                                            </a>
                                        </li>
                                    </div>
                                ) : (
                                    <div className="navbar-nav ml-auto">
                                        <li className="nav-item text-uppercase">
                                            <Link to={"/register"}
                                                  className="nav-link BsBackspaceReverse"> REGISTER </Link>
                                        </li>
                                        <li className="nav-item text-uppercase">
                                            <Link to={"/login"} className="nav-link"> LOGIN </Link>
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
