import React, {Component} from 'react';
import {Card, Col, Container, Image, Row} from "react-bootstrap";

import LaptopWall from './../../../assets/images/Laptop/LaptopWall.jpg';

class LaptopBodyWall extends Component {

    divBack = {
        'background-color' : '#212121',
        color : 'white'
    }

    divBox = {
        height: '10px'
    }

    render() {
        return (
            <div>
                <div style={this.divBox}/>
                <Container style={this.divBack}>
                    <Row>
                        <Col sm={4}>
                            <h1>Laptops</h1>
                        </Col>
                        <Col sm={8}>
                            <Card>
                                <Card.Body>
                                    <Card.Img variant="top" src={LaptopWall} />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <div style={this.divBox}/>
            </div>
        );
    }
}

export default LaptopBodyWall;