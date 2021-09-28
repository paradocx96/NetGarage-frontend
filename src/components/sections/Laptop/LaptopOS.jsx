import React, {Component} from 'react';
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

import ServiceLaptopOS from "../../../services/ServiceLaptopOS";

class LaptopOs extends Component {

    // TODO: Initializing state values and functions
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            getAllOS: []
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onNameHandle = this.onNameHandle.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.submitDelete = this.submitDelete.bind(this);
    }

    // TODO: Initializing default values
    initialState = {
        name: ''
    }

    componentDidMount = async () => {
        // TODO: GET ALL LAPTOP OS
        await ServiceLaptopOS.getLaptopOS()
            .then(response => response.data)
            .then((data) => {
                this.setState({getAllOS: data});
            }).catch(error =>
                console.log(error.message)
            );
    }

    // TODO: Assign Name to State variables
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
        await ServiceLaptopOS.postLaptopOS(value)
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

    // TODO: Function for Delete
    handleDelete = async (id) => {
        await ServiceLaptopOS.deleteLaptopOSById(id)
            .then(response => response.data)
            .then((data) => {
                console.log(data)
            }).catch(error => {
                console.log(error.message);
            });

        await this.componentDidMount();
    }

    // TODO: Function for confirm delete operation
    submitDelete = (id) => {
        confirmAlert({
            title: 'Confirm to delete!',
            message: 'Are you sure to delete this OS?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.handleDelete(id);
                        console.log('Delete Operation Proceed!');
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        console.log('Delete Operation Canceled!');
                    }
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true
        });
    };

    render() {
        return (
            <div>
                <Container>
                    <h3>Laptop OS</h3>

                    <section className={'pt-3 pb-3'}>
                        <Form onSubmit={this.onSubmit.bind(this)} onReset={this.onReset.bind(this)}>
                            <Form.Group as={Row} controlId="Name">
                                <Col sm={4}>
                                    <Form.Control placeholder="New OS Name"
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

                    <section className={'pt-3 pb-3'}>
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
                                this.state.getAllOS.length === 0 ?
                                    <tr>
                                        <td>{'Data Not Available!'}</td>
                                    </tr>
                                    :
                                    this.state.getAllOS.map((item) => (
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
                                                    onClick={this.submitDelete.bind(this, item.id)}
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

export default LaptopOs;