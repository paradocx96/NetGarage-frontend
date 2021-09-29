import React, {Component} from 'react';
import {Button, Container, Form, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {confirmAlert} from "react-confirm-alert";
import FileDownload from "js-file-download";
import CommonCheckAuth from "../../../services/CommonCheckAuth";
import ServiceLaptop from "../../../services/ServiceLaptop";
import 'react-confirm-alert/src/react-confirm-alert.css';

import NavigationBarDashboard from "../../layouts/Navigation/NavigationBarDashboard";
import LaptopDashboardBodyWall from "../../layouts/Laptop/LaptopDashboardBodyWall";
import FooterAdmin from "../../layouts/Footer/FooterAdmin";

class LaptopDashboard extends Component {

    divBack = {
        backgroundColor: '#212121'
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

        this.handleCheckBox = this.handleCheckBox.bind(this);
        this.submitDeleteSelected = this.submitDeleteSelected.bind(this);
        this.handleDeleteSelected = this.handleDeleteSelected.bind(this);
        this.handleActivate = this.handleActivate.bind(this);
        this.handleDeactivate = this.handleDeactivate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.submitDelete = this.submitDelete.bind(this);
        this.generateReport = this.generateReport.bind(this);
    }

    initialState = {
        laptopList: [],
        selectedId: [],
        isChecked: false
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

    // TODO: Assign values to State variables
    handleCheckBox = (event) => {
        this.state.selectedId.push(event.target.id);
    }

    // TODO: Function for confirm delete operation
    submitDeleteSelected = () => {
        confirmAlert({
            title: 'Confirm to delete?',
            message: 'Are you sure to delete selected Laptops.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.handleDeleteSelected();
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

    // TODO: Function for Delete
    handleDeleteSelected = async () => {

        const formData = new FormData();
        formData.append("ids", this.state.selectedId);

        setTimeout(async () => {
            console.log(formData);

            // await ServiceLaptop.deleteLaptopSelected(formData)
            //     .then(response => response.data)
            //     .then((data) => {
            //         console.log(data)
            //     }).catch(error => {
            //         console.log(error.message);
            //     });

            await this.componentDidMount();
        }, 2000);
    }

    //TODO: Function for activate
    handleActivate = async (id) => {
        let value = {
            id: id,
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
            id: id,
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

    generateReport = async () => {
        await ServiceLaptop.generateReportAllLaptops()
            .then((response) => {
                let headerLine = response.request.getResponseHeader('Content-Disposition');
                let startFileNameIndex = headerLine.indexOf('=') + 1;
                let endFileNameIndex = headerLine.lastIndexOf('"');
                let filename = headerLine.substring(startFileNameIndex, endFileNameIndex);

                FileDownload(response.data, filename + ".pdf");
            });
    }

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
                            <th>#</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th> </th>
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
                                        <td>
                                            <Form>
                                                <Form.Check inline
                                                            name="group1"
                                                            type="checkbox"
                                                            id={item.id}
                                                            onChange={this.handleCheckBox}
                                                />
                                            </Form>
                                        </td>
                                        <td>
                                            <img style={{width: "100px"}}
                                                 src={item.image || "https://via.placeholder.com/50"}
                                                 alt="firebase-image"
                                            />
                                        </td>
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
                                            <Link to={`/laptops-admin-main-image-upload/` + item.id}
                                                  className={'btn btn-light'}>
                                                Upload Main Image
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={`/laptops-admin-image-upload/` + item.id}
                                                  className={'btn btn-light'}>
                                                Upload Gallery Images
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={`/laptops-admin-image-view/` + item.id}
                                                  className={'btn btn-info'}>
                                                View Image
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={`/laptops-admin-edit/` + item.id}
                                                  className={'btn btn-primary'}>
                                                Edit
                                            </Link>
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

                    <div>
                        <Button onClick={this.generateReport}
                                className="btn-primary">Generate Report</Button>{'\u00A0'}
                        <Button onClick={this.submitDeleteSelected}
                                className="btn-danger">Delete Selected</Button>
                    </div>
                </Container>
                <div style={this.divBox}/>
                <FooterAdmin/>
            </div>
        );
    }
}

export default CommonCheckAuth(LaptopDashboard);