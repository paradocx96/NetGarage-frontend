import React, {Component} from 'react';
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";

import ServiceLaptopBrand from "../../../services/ServiceLaptopBrand";
import ServiceLaptop from "../../../services/ServiceLaptop";

class LaptopBrand extends Component {

    // TODO: Initializing state values and functions
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            getAllBrand: []
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onNameHandle = this.onNameHandle.bind(this);
    }

    // TODO: Initializing default values
    initialState = {
        name: ''
    }

    componentDidMount = async () => {
        // TODO: GET ALL LAPTOP BRAND
        await ServiceLaptopBrand.getLaptopBrand()
            .then(response => response.data)
            .then((data) => {
                this.setState({getAllBrand: data});
            }).catch(error =>
                console.log(error.message)
            );
    }

    // TODO: Assign Brand values to State variables
    onNameHandle = (event) => {
        this.setState({name: event.target.value});
    }

    // TODO: Submit form values
    onSubmit = async (event) => {
        event.preventDefault();

        let value = {
            name: this.state.name,
            user: 'Admin'
        }

        // TODO: Save value in database
        await ServiceLaptopBrand.postLaptopBrand(value)
            .then(response => response.data)
            .then((data) => {
                console.log(data);
            })
            .catch(function (error) {
                console.log(error.message);
            });

        this.onReset();
        await this.componentDidMount();
    }

    // TODO: Reset form values
    onReset = () => {
        this.setState(() => this.initialState)
    }

    render() {
        return (
            <div>
                <Container>
                    <h1>Laptop Brand</h1>

                    <section className={'pt-3 pb-3'}>
                        <Form onSubmit={this.onSubmit.bind(this)} onReset={this.onReset.bind(this)}>
                            <Form.Group as={Row} controlId="Name">
                                <Col sm={4}>
                                    <Form.Control placeholder="New Brand Name"
                                                  name="name"
                                                  required
                                                  value={this.state.name}
                                                  onChange={this.onNameHandle.bind(this)}/>
                                </Col>
                                <Col>
                                    <Button type="submit" className="btn-success">SAVE</Button>{'\u00A0'}
                                    <Button type="reset" className="btn-danger">RESET</Button>{'\u00A0'}
                                </Col>
                            </Form.Group>
                        </Form>
                    </section>

                    <section>
                        <Table striped bordered hover variant="dark" size="sm">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>User</th>
                                <th>Date & Time</th>
                                <th> </th>
                                <th> </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.getAllBrand.length === 0 ?
                                    <tr>
                                        <td>{'Data Not Available!'}</td>
                                    </tr>
                                    :
                                    this.state.getAllBrand.map((item) => (
                                        <tr key={item.id}>
                                            <td>#</td>
                                            <td>{item.name}</td>
                                            <td>{item.user}</td>
                                            <td>{item.datetime}</td>
                                            <td>
                                                <Button
                                                    // onClick={this.handleEdit.bind(this, item.id)}
                                                    className="btn-primary">Edit</Button>
                                            </td>
                                            <td>
                                                <Button
                                                    // onClick={this.submitDelete.bind(this, item.id)}
                                                    className="btn-danger">Delete</Button>
                                            </td>
                                        </tr>
                                    ))
                            }
                            </tbody>
                        </Table>
                    </section>
                </Container>
            </div>
        );
    }
}

export default LaptopBrand;