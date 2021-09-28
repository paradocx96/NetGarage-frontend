import React, {Component} from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import ServiceUser from "../../../services/ServiceUser";
import "../../../assets/style/AddFeedback.css"

// TODO: Validating registration form fields
const requiredField = data => {
    if (!data) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

class AddFeedback extends Component {
    backColor = {
        'background-color' : '#4CAF50',
        color: 'white'
    }

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.onChangeUserNickname = this.onChangeUserNickname.bind(this);
        this.onChangeUserComment = this.onChangeUserComment.bind(this);

        this.state = {
            deviceID:"1000",
            userNickname:"",
            userComment:""
        };
    }
    onChangeUserNickname(event) {
        this.setState({
            userNickname: event.target.value
        })
    }

    onChangeUserComment(event){
        this.setState({
            userComment: event.target.value
        })
    }

    handleReset = e => {
        this.setState({ userNickname:"", userComment:""})
    }

    handleSubmit(event){
        event.preventDefault();

        // TODO: Validate form fields
        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            ServiceUser.addUserFeedback(this.state.deviceID, this.state.userNickname, this.state.userComment)
                .then(response => {
                    console.log(response.data);
                });
        }

    }

    // TODO: Display Website
    render() {
        return (
            <div className="auth-wrapper-feedback">
                <div className="auth-inner-feedback">

                    <Form onSubmit={this.handleSubmit} ref={check => {this.form = check; }}>
                        <h3>Post Your Comment Here</h3>
                        <div className="form-group">
                            <label htmlFor="nickname">Your nick name(optional)</label>
                            <Input
                                type="text"
                                placeholder="Enter nickname"
                                className="form-control"
                                name="userNickname"
                                value={this.state.userNickname}
                                onChange={this.onChangeUserNickname}
                            />
                        </div>

                        <br></br>

                        <div className="form-group">
                            <label htmlFor="comment">Your comment</label>
                            <textarea
                                type="text"
                                placeholder="Enter Your comment"
                                className="form-control"
                                name="userComment"
                                value={this.state.userComment}
                                onChange={this.onChangeUserComment}
                                validations={[requiredField]}
                                rows={"5"}
                            />
                        </div>

                        <br></br>
                        <table>
                                <tr>
                                   <th>
                                       <button className="btn btn-block" style={this.backColor}
                                                disabled={this.state.loading}>
                                            {this.state.loading && (
                                                <span className="spinner-border spinner-border-sm"> </span>
                                            )}
                                            <span>&nbsp;Post&nbsp;</span>
                                       </button>
                                   </th>

                                    <th>
                                        <button className="btn btn-danger btn-block" onClick={this.handleReset}>
                                            <span>Reset</span>
                                        </button>
                                    </th>
                                </tr>
                        </table>
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