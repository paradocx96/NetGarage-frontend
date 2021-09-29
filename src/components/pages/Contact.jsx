import React, {Component} from 'react';

import Footer from "../layouts/Footer/Footer";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";

class Contact extends Component {

    textStyleH1 = {
        textAlign: 'center',
        marginTop: '50px',
    }

    cardBox = {
        marginBottom: '10px'
    }

    // TODO: Initializing state values and functions
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.onSubmit = this.onSubmit.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    // TODO: Initializing default values
    initialState = {
        name: '',
        email: '',
        subject: '',
        message: ''
    }

    // TODO: Assign form values to State variables
    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // TODO: Submit form values
    onSubmit = (event) => {
        event.preventDefault();
        console.log('Email Send!');
        console.log('Name : ', this.state.name);
        console.log('Email : ', this.state.email);
        console.log('Subject : ', this.state.subject);
        console.log('Message : ', this.state.message);
        this.onReset();
    }

    // TODO: Reset form values
    onReset = () => {
        this.setState(() => this.initialState)
    }

    render() {
        return (
            <div>
                <Container>
                    <h1 style={this.textStyleH1}>Contact Us</h1>
                    <Row>
                        <Col>
                            <div className="pt-5 pb-5">
                                <div style={this.cardBox}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Address</Card.Title>
                                            <Card.Text>NetGarage,</Card.Text>
                                            <Card.Text>Sri Lanka.</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>

                                <div style={this.cardBox}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Telephone</Card.Title>
                                            <Card.Text>+94xxxxxxxxx</Card.Text>
                                            <Card.Title>Fax</Card.Title>
                                            <Card.Text>+94xxxxxxxxx</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>

                                <div style={this.cardBox}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Email</Card.Title>
                                            <Card.Text>info@netgarage.lk</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>

                            </div>
                        </Col>
                        <Col>
                            <div className="pt-5 pb-5">
                                <Container>
                                    <Form onSubmit={this.onSubmit.bind(this)}>
                                        <Form.Group controlId="Name" as={Row}>
                                            <Col>
                                                <Form.Control placeholder="Your Name"
                                                              name="name"
                                                              value={this.state.name}
                                                              onChange={this.onChange}/>
                                            </Col>
                                        </Form.Group>

                                        <Form.Group controlId="Email" as={Row} className={'pt-2'}>
                                            <Col>
                                                <Form.Control type="email"
                                                              placeholder="Your Email"
                                                              name="email"
                                                              value={this.state.email}
                                                              onChange={this.onChange}/>
                                            </Col>
                                        </Form.Group>

                                        <Form.Group controlId="Subject" as={Row} className={'pt-2'}>
                                            <Col>
                                                <Form.Control placeholder="Subject"
                                                              name="subject"
                                                              value={this.state.subject}
                                                              onChange={this.onChange}/>
                                            </Col>
                                        </Form.Group>

                                        <Form.Group controlId="Message" as={Row} className={'pt-2'}>
                                            <Col>
                                                <Form.Control as="textarea"
                                                              placeholder="Message"
                                                              rows={5}
                                                              name="message"
                                                              value={this.state.message}
                                                              onChange={this.onChange}/>
                                            </Col>
                                        </Form.Group>
                                        <div className={'pt-2'}>
                                            <Button variant="primary" type="submit">
                                                Send Message
                                            </Button>
                                        </div>
                                    </Form>
                                </Container>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Footer/>
            </div>
        );
    }
}

export default Contact;
