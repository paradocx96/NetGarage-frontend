import React, {Component} from 'react';
import ServiceUser from "../../../services/ServiceUser";
import {Table} from "react-bootstrap";

class ViewFeedback extends Component {
    tableView = {
        borderRadius: '25px',
        backgroundColor: '#ffffff',
        padding: '10px',
        textAlign: 'left'
    }
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.parentDeviceID,
            commentList: []
        }

    }

    componentDidMount = async ()=>{
        const {parentDeviceID} = this.props;
        console.log(parentDeviceID);
        this.setState({deviceID: parentDeviceID});
    }

    componentDidUpdate = async () => {
        const {parentDeviceID} = this.props;
        const prevID = this.state.deviceID;
        if(parentDeviceID && parentDeviceID !="" && parentDeviceID != prevID){
            console.log("View Profile " + parentDeviceID);
            this.setState({deviceID: parentDeviceID});
            await this.fetch(parentDeviceID);
        }



    }

    fetch = async (id)=>{
        this.setState({
            id
        });
        await ServiceUser.getFeedbackByDeviceID(id)
            .then(response => response.data)
            .then((data) => {
                this.setState({commentList: data});
                console.log(data);
            }).catch(error =>
                console.log(error.message)
            );
    }

    render() {
        return (
            <div style={this.tableView}>
                {
                    this.state.commentList.length === 0 ?
                        <h5>No Comments yet</h5> :
                        this.state.commentList.map((data) => (
                            <Table striped bordered hover>
                                <tbody>
                                <tr>
                                    <th>Name : {data.nickName}</th> <br></br>
                                </tr>
                                <tr>
                                    <td>Comment : {data.comment}</td>
                                </tr>
                                <br></br>
                                </tbody>
                            </Table>
                        ))
                }

            </div>
        );
    }
}

export default ViewFeedback;