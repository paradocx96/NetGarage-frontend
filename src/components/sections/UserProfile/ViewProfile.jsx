//Name : Malwatta H.G.
//ID : IT19240848


import React, {Component} from "react";
//import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
//import {Link} from "react-router-dom"
import ServiceUser from "../../../services/ServiceUser";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../../assets/style/Registration.css";
import {Link, withRouter} from "react-router-dom";
import {confirmAlert} from "react-confirm-alert";
import {Button} from "react-bootstrap";
import ViewProfileBackground from "../../../assets/images/ViewProfile/viewProfileBackground.jpg"

class ViewProfile extends Component {
    backColor = {
        'background-color' : '#4CAF50',
        color: 'white'
    }

    // TODO: Initializing state values and functions
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.submitDelete = this.submitDelete.bind(this);

        this.state = {
            currentUser: undefined,
            username: "",
            password: "",
            email:"",
        };
    }

    componentDidMount () {
       const user = ServiceUser.getCurrentUser();
        console.log("User Data : " + user);
        if (user) {
            this.setState({
                currentUser: user,
                id:user.id,
                username: user.username,
                password: user.email,
                email: user.email,
            });

        }
    }

    // TODO: Function for Delete
    handleDelete = async (id) => {
        ServiceUser.deleteAccount(id).then(
            () => {
                ServiceUser.logout();
                this.props.history.push("/");
                window.location.reload();
            },
            error => {
                const resMessage = (error.response && error.response.data.message && error.response.data) || error.message || error.toString();
                console.log(resMessage);
            }
        );

        await this.componentDidMount();
    }

    // TODO: Function for confirm delete operation
    submitDelete = (id) => {
        confirmAlert({
            title: 'Confirm to delete?',
            message: 'Are you sure to delete this account?',
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

    // TODO: Display Website
    render() {
        return (
            <div style={{ backgroundImage: `url(${ViewProfileBackground})`, backgroundSize: 'cover', overflow: 'hidden', }}>
            <div className="auth-wrapper-register">
                <div className="auth-inner-register">
                    <Form>
                        <h3 className={"text-dark"}>Profile</h3>
                        <div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Input
                                    type="text"
                                    placeholder="Enter email"
                                    className="form-control"
                                    name="email"
                                    value={this.state.email}
                                    readOnly
                                />
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Input
                                    type="text"
                                    placeholder="Enter username"
                                    className="form-control"
                                    name="username"
                                    value={this.state.username}
                                    readOnly
                                />
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Input
                                    type="password"
                                    placeholder="Enter password"
                                    className="form-control"
                                    name="password"
                                    value={this.state.password}
                                    readOnly
                                />
                            </div>
                            <br/>
                            <br/>
                            <div className="form-group d-grid gap-2">
                                <Link to="/edit-profile" className="btn btn-primary"> Edit </Link>
                                <Button onClick={this.submitDelete.bind(this, this.state.id)} className="btn-danger">Delete</Button>
                            </div>
                          </div>
                    </Form>

                </div>
            </div>
            </div>
        );
    }
}

export default withRouter(ViewProfile);
