import React, {Component} from 'react';

import ServiceLaptopGraphic from "../../../services/ServiceLaptopGraphic";
import {Button, Container, Table} from "react-bootstrap";

class LaptopGraphic extends Component {

    // TODO: Initializing state values and functions
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            getAllGraphic: []
        }

        // this.onSubmit = this.onSubmit.bind(this);
        // this.onReset = this.onReset.bind(this);
        // this.onNameHandle = this.onNameHandle.bind(this);
    }

    // TODO: Initializing default values
    initialState = {
        name: ''
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

    render() {
        return (
            <div>
                <Container>
                <h3>Laptop Graphic</h3>

                    <section>

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

export default LaptopGraphic;