//Name : Malwatta H.G.
//ID : IT19240848


import React, {Component} from "react";
//import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
//import {Link} from "react-router-dom"
import ServiceUser from "../../../services/ServiceUser";
import CommonCheckAuth from "../../../services/CommonCheckAuth";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../../assets/style/Registration.css";
import {Link} from "react-router-dom";


class ViewProfile extends Component {
    backColor = {
        'background-color' : '#4CAF50',
        color: 'white'
    }

    // TODO: Initializing state values and functions
    constructor(props) {
        super(props);

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
                username: user.username,
                password: user.email,
                email: user.email,
            });

        }
    }

    // TODO: Display Website
    render() {
        return (

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
                            </div>
                          </div>
                    </Form>

                </div>
            </div>
        );
    }
}

export default CommonCheckAuth(ViewProfile);
