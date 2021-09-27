import React, {Component} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

class Footer extends Component {
    FooterStyle = {
        background: '#2c2c2d',
        color: 'white'
    }

    FooterStyleUnder = {
        background: '#2c2c2d',
        color: 'white',
        textAlign: 'center',
    }

    linkStyle = {
        margin: "1rem",
        textDecoration: "none",
        color: 'white'
    }

    ulStyle = {
        listStyleType: 'square'
    }

    render() {
        return (
            <div>
                <div style={this.FooterStyle}>
                    <Container>
                        <Row className={'pt-5'}>
                            <Col>
                                <h4>NetGarage</h4>
                                <br/>
                                <h6>Address</h6>
                                <p>NetGarage,<br/>
                                    Sri Lanka</p>
                                <h6>Telephone</h6>
                                <p>+94xxxxxxxxx</p>
                                <h6>Fax</h6>
                                <p>+94xxxxxxxxx</p>
                                <h6>Email</h6>
                                <p>info@netgarage.lk</p>
                            </Col>
                            <Col>
                                <h4>Quick links</h4>
                                <ul style={this.ulStyle}>
                                    <li>
                                        <Link to={'/phones/viewAllPhonesInternal1'} style={this.linkStyle}>Phone</Link>
                                    </li>
                                    <li>
                                        <Link to={'/laptops'} style={this.linkStyle}>Laptop</Link>
                                    </li>
                                    <li>
                                        <Link to={'/contact'} style={this.linkStyle}>Contact</Link>
                                    </li>
                                    <li>
                                        <Link to={'/login'} style={this.linkStyle}>Login</Link>
                                    </li>
                                </ul>
                            </Col>
                            <Col>
                                <h4>About NetGarage</h4>
                                <ul style={this.ulStyle}>
                                    <li>
                                        <Link to={'/'} style={this.linkStyle}>More Details</Link>
                                    </li>
                                    <li>
                                        <Link to={'/contact'} style={this.linkStyle}>Contact</Link>
                                    </li>
                                </ul>

                                <h4>Social Media</h4>
                                <ul style={this.ulStyle}>
                                    <li>
                                        <Link to={'/'} style={this.linkStyle}>Facebook</Link>
                                    </li>
                                    <li>
                                        <Link to={'/'} style={this.linkStyle}>Twitter</Link>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div style={this.FooterStyleUnder}>
                    <Container>
                        <Row>
                            <Col>
                                <p>© 2021 NetGarage. All Rights Reserved.<br/>MADE WITH ❤ BY CODEWAVE</p>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}

export default Footer;