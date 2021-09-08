import React, {Component} from 'react';

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            id:"",
            password: "",
            confirmPassword: "",
            loading: false,
            message: "",
            successful: false,
        };

    }
    onChangePassword(event) {
        this.setState({
            password: event.target.value
        });
    }
    onChangeConfirmPassword(event) {
        this.setState({
            confirmPassword: event.target.value
        });
    }
    handleSubmit(event){
        event.preventDefault();

        this.setState({
            message: "",
            successful: false,
            loading: true
        });
        // TODO: Validate register form fields
        this.form.validateAll();
    }

    render() {
        return (
            <div className="auth-wrapper-login">
                <div className="auth-inner-login">

                    <Form onSubmit={this.handleSubmit} ref={check => {
                        this.form = check;
                    }}>
                        <h3>Reset Password</h3>

                        {!this.state.successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Input
                                        type="password"
                                        placeholder="Enter password"
                                        className="form-control"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                        validations={[requiredField, userPassword]}
                                    />
                                </div>

                                <br></br>

                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Re-enter Password</label>
                                    <Input
                                        type="password"
                                        placeholder="Re-enter password"
                                        className="form-control"
                                        name="confirmPassword"
                                        expectedvalue={this.state.password}
                                        value={this.state.confirmPassword}
                                        onChange={this.onChangeConfirmPassword}
                                        validations={[requiredField, userConfirmPassword]}
                                    />
                                </div>

                                <br></br>

                                <div className="form-group d-grid gap-2">
                                    <button className="btn btn-success btn-block" disabled={this.state.loading}>
                                        {this.state.loading && (
                                            <span className="spinner-border spinner-border-sm"> </span>
                                        )}
                                        <span>Submit</span>
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

export default ResetPassword;