import React, {Component} from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

class AddFeedback extends Component {

    // TODO: Display Website
    render() {
        return (
            <div className="auth-wrapper-login">
                <div className="auth-inner-login">

                    <Form onSubmit={this.handleSubmit} ref={check => {this.form = check; }}>
                        <h3>Sign In</h3>
                        <div className="form-group">
                            <label htmlFor="nickname">Your nick name(optional)</label>
                            <Input
                                type="text"
                                placeholder="Enter nickname"
                                className="form-control"
                                name="userNickname"
                                value={this.state.userNickname}
                                onChange={this.onChangeNickname}
                            />
                        </div>

                        <br></br>

                        <div className="form-group">
                            <label htmlFor="comment">Your comment</label>
                            <Input
                                type="text-area"
                                placeholder="Enter Your comment"
                                className="form-control"
                                name="userComment"
                                value={this.state.userComment}
                                onChange={this.onChangeComment}
                                validations={[requiredField]}
                            />
                        </div>

                        <br></br>

                        <div className="form-group d-grid gap-2">
                            <button className="btn btn-block" style={this.backColor}
                                    disabled={this.state.loading}>
                                {this.state.loading && (
                                    <span className="spinner-border spinner-border-sm"> </span>
                                )}
                                <span>Post</span>
                            </button>
                            <button className="btn btn-danger btn-block" onClick={this.handleReset}>
                                <span>Reset</span>
                            </button>
                        </div>

                        {this.state.message && (
                            <div className="form-group">
                                <div className="alert alert-danger text-center" role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                        <CheckButton style={{ display: "none" }} ref={check => {this.checkBtn = check;}}
                        />
                    </Form>
                </div>
            </div>
        );
    }
}

export default AddFeedback;