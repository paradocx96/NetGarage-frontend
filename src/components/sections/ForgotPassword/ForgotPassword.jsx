import React, {Component} from 'react';
import Form from "react-validation/build/form";

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