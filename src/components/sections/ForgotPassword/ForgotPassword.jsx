import React, {Component} from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {isEmail} from "validator";

import ServiceUser from "../../../services/ServiceUser";

// TODO: create to validate form fields
const requiredField = data => {
    if (!data) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

// TODO: Validating registration Email fields
const userEmail = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            email: "",
            loading: false,
            message: "",
            successful: false
        };

    }

    onChangeEmail(event) {
        this.setState({
            email: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({
            message: "",
            successful: false,
            loading: true
        });

        // TODO: Validate forgot password form field
        this.form.validateAll();

        // TODO: Calling Forgot password service function and check if user is available or not
        if (this.checkBtn.context._errors.length === 0) {
            ServiceUser.forgotPassword(this.state.email)
                .then(response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });
                }, error => {
                    const resMessage =
                        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage,
                        loading: false,
                    });
                });
        } else {
            this.setState({
                loading: false,
            });
        }
    }
    render() {
        return (
                <div className="auth-wrapper-login">
                    <div className="auth-inner-login">

                        <Form onSubmit={this.handleSubmit} ref={check => {
                            this.form = check;
                        }}>
                            <h3>Forgot Password</h3>

                            {!this.state.successful && (
                                <div>
                                    <div className="form-group">
                                        <p>
                                            Password reset instructions will be sent to your email address provided below.
                                            After submitting this request if you don’t receive an email please check
                                            your mail box. if not please contact us.

                                        </p>
                                    </div>

                                    <div className="form-group">
                                        <Input
                                            type="text"
                                            placeholder="Enter your email"
                                            className="form-control"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.onChangeEmail}
                                            validations={[requiredField, userEmail]}
                                        />
                                    </div>

                                    <br></br>

                                    <div className="form-group d-grid gap-2">
                                        <button className="btn btn-primary btn-block" disabled={this.state.loading}>
                                            {this.state.loading && (
                                                <span className="spinner-border spinner-border-sm"> </span>
                                            )}
                                            <span>Forgot Password</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            <br></br>

                            {this.state.message && (
                                <div className="form-group">
                                    <div
                                        className={this.state.successful ? "alert alert-success text-center" : "alert alert-danger text-center"}
                                        role="alert">
                                        {this.state.message}
                                    </div>
                                </div>
                            )}
                            <CheckButton style={{display: "none"}} ref={check => {
                                this.checkBtn = check;
                            }}
                            />
                        </Form>
                    </div>
                </div>
        );
    }
}

export default ForgotPassword;