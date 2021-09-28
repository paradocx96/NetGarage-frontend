import React, {Component} from 'react';
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import ServiceLaptopGraphic from "../../../services/ServiceLaptopGraphic";

import Toast1 from "../../Toasts/Toast1";
import Toast2 from "../../Toasts/Toast2";
import ServiceUser from "../../../services/ServiceUser";

class LaptopGraphic extends Component {

    // TODO: Initializing state values and functions
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.getAllGraphic = [];
        this.state.show = false;
        this.state.showNotAvailable = false;
        this.state.currentUser = '';
        this.state.currentUser = ServiceUser.getCurrentUser();

        this.onSubmit = this.onSubmit.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onNameHandle = this.onNameHandle.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.submitDelete = this.submitDelete.bind(this);
    }

    // TODO: Initializing default values
    initialState = {
        name: '',
        isAvailable: ''
    }

    componentDidMount = async () => {
        // TODO: GET ALL LAPTOP GRAPHIC
        await ServiceLaptopGraphic.getLaptopGraphic()
            .then(response => response.data)
            .then((data) => {
                this.setState({getAllGraphic: data});
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
        await this.checkAvailability();

        if (this.state.isAvailable == 'available') {

            let value = {
                name: this.state.name,
                user: this.state.currentUser.username
            }

            // TODO: Save value in database
            await ServiceLaptopGraphic.postLaptopGraphic(value)
                .then(response => response.data)
                .then((data) => {
                    if (data != null) {
                        console.log("ID : ", data.id);
                        this.setState({"show": true});
                        setTimeout(() => this.setState({"show": false}), 3000);
                    }
                })
                .catch(function (error) {
                    console.log(error.message);
                });

            setTimeout(() => {
                this.onReset();
                this.componentDidMount();
            }, 2000);

        } else if (this.state.isAvailable == 'unavailable') {
            console.log(this.state.isAvailable);
            this.setState({"showNotAvailable": true});
            setTimeout(() => this.setState({"showNotAvailable": false}), 3000);
        } else {
            console.log("ERROR OCCUR!!!");
        }
    }

    // TODO: Reset form values
    onReset = () => {
        this.setState(() => this.initialState)
    }

    // TODO: Function for Delete
    handleDelete = async (id) => {
        await ServiceLaptopGraphic.deleteLaptopGraphicById(id)
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
            message: 'Are you sure to delete this Graphic Brand?',
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

    checkAvailability = async () => {
        await ServiceLaptopGraphic.checkAvailable(this.state.name)
            .then(response => response.data)
            .then((data) => {
                console.log(data);
                if (data == true) {
                    this.setState({isAvailable: "unavailable"});
                } else {
                    this.setState({isAvailable: "available"});
                }
            }).catch(error => {
                console.log(error.message);
            });
    }

    render() {
        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <Toast1
                        children={{
                            show: this.state.show,
                            message: "Brand added successfully.",
                            type: 'success'
                        }}
                    />
                </div>
                <div style={{"display": this.state.showNotAvailable ? "block" : "none"}}>
                    <Toast2
                        children={{
                            show: this.state.showNotAvailable,
                            message: "Brand is already taken.",
                            type: 'warning'
                        }}
                    />
                </div>
                <Container>
                    <h3>Laptop Graphic</h3>

                    <section className={'pt-3 pb-3'}>
                        <Form onSubmit={this.onSubmit.bind(this)} onReset={this.onReset.bind(this)}>
                            <Form.Group as={Row} controlId="Name">
                                <Col sm={4}>
                                    <Form.Control placeholder="New Graphic Name"
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
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.getAllGraphic.length === 0 ?
                                    <tr>
                                        <td>{'Data Not Available!'}</td>
                                    </tr>
                                    :
                                    this.state.getAllGraphic.map((item) => (
                                        <tr key={item.id}>
                                            <td>#</td>
                                            <td>{item.name}</td>
                                            <td>{item.user}</td>
                                            <td>{item.datetime}</td>
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

export default LaptopGraphic;