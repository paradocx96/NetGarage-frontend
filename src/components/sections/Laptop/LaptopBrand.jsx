import React, {Component} from 'react';
import {Button, Container, Table} from "react-bootstrap";
import {Link} from "react-router-dom";

import ServiceLaptopBrand from "../../../services/ServiceLaptopBrand";

class LaptopBrand extends Component {

    // TODO: Initializing state values and functions
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            getAllBrand: []
        }
    }

    // TODO: Initializing default values
    initialState = {
        name: '',
        user: ''
    }

    componentDidMount = async () => {

        // TODO: GET ALL LAPTOP BRAND
        await ServiceLaptopBrand.getLaptopBrand()
            .then(response => response.data)
            .then((data) => {
                console.log(data);
                this.setState({getAllBrand: data});
            }).catch(error =>
                console.log(error.message)
            );
    }

    render() {
        return (
            <div>
                <Container>
                    <h1>Laptop Brand</h1>

                    <section>

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