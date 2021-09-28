import React, {Component} from 'react';
import {Col, Container, Row} from "react-bootstrap";

class FooterAdmin extends Component {

    FooterStyleUnder = {
        background: '#2c2c2d',
        color: 'white',
        textAlign: 'center',
        height: '75px'
    }

    render() {
        return (
            <div>
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

export default FooterAdmin;