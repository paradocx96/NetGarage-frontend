import React, {Component} from 'react';
import {Button, Container, Table} from "react-bootstrap";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

import NavigationBarDashboard from "../../layouts/Navigation/NavigationBarDashboard";
import LaptopDashboardBodyWall from "../../layouts/Laptop/LaptopDashboardBodyWall";
import ServiceLaptop from "../../../services/ServiceLaptop";
import {Link} from "react-router-dom";

class LaptopDashboard extends Component {

    divBack = {
        backgroundColor: '#212121'
    }

    divSection = {
        margin: '20px',
        padding: '20px',
        borderRadius: '25px',
        backgroundColor: '#ffffff'
    }

    textStyleH1 = {
        textAlign: 'center',
        marginBottom: '50px',
        marginTop: '50px',
    }

    divBox = {
        height: '150px'
    }

    constructor(props) {
        super(props);
        this.state = this.initialState;

        this.handleActivate = this.handleActivate.bind(this);
        this.handleDeactivate = this.handleDeactivate.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.submitDelete = this.submitDelete.bind(this);
    }

    initialState = {
        laptopList: []
    }

    componentDidMount = async () => {
        await ServiceLaptop.getLaptop()
            .then(response => response.data)
            .then((data) => {
                this.setState({laptopList: data});
            }).catch(error =>
                console.log(error.message)
            );
    }

    //TODO: Function for activate
    handleActivate = async (id) => {
        let value = {
            id : id,
            status: 'Activated'
        }

        await ServiceLaptop.updateLaptopStatus(value)
            .then(response => response.data)
            .then((data) => {
                console.log(data)
            }).catch(error => {
                console.log(error.message);
            })

        await this.componentDidMount();
    }

    //TODO: Function for deactivate
    handleDeactivate = async (id) => {
        let value = {
            id : id,
            status: 'Deactivated'
        }

        await ServiceLaptop.updateLaptopStatus(value)
            .then(response => response.data)
            .then((data) => {
                console.log(data)
            }).catch(error => {
                console.log(error.message);
            })

        await this.componentDidMount();
    }

    //TODO: Function for Edit
    handleEdit = async (id) => {

    }

    // TODO: Function for Delete
    handleDelete = async (id) => {
        await ServiceLaptop.deleteLaptopById(id)
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
            title: 'Confirm to delete?',
            message: 'Are you sure to delete this Laptop.',
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
            <div style={this.divBack}>
                <NavigationBarDashboard/>
                <LaptopDashboardBodyWall/>

                <Container>
                    <Table striped bordered hover variant="dark" size="sm">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.laptopList.length === 0 ?
                                <tr>
                                    <td>{'Data Not Available!'}</td>
                                </tr>
                                :
                                this.state.laptopList.map((item) => (
                                    <tr key={item.id}>
                                        <td>#</td>
                                        <td>{item.brand + ' ' + item.name}</td>
                                        <td>{item.status}</td>
                                        <td>
                                            <Button onClick={this.handleActivate.bind(this, item.id)}
                                                    className="btn-success">Publish</Button>
                                        </td>
                                        <td>
                                            <Button onClick={this.handleDeactivate.bind(this, item.id)}
                                                    className="btn-warning">Unpublished</Button>
                                        </td>
                                        <td>
                                            <Link to={`/laptops-admin-image-upload/`+ item.id} className={'btn btn-light'}>
                                                Upload Image
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={`/laptops-admin-image-view/`+ item.id} className={'btn btn-info'}>
                                                View Image
                                            </Link>
                                        </td>
                                        <td>
                                            <Button onClick={this.handleEdit.bind(this, item.id)}
                                                    className="btn-primary">Edit</Button>
                                        </td>
                                        <td>
                                            <Button onClick={this.submitDelete.bind(this, item.id)}
                                                    className="btn-danger">Delete</Button>
                                        </td>
                                    </tr>
                                ))
                        }
                        </tbody>
                    </Table>
                </Container>
                <div style={this.divBox}/>
            </div>
        );
    }
}

export default LaptopDashboard;