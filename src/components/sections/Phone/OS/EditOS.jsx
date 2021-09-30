import React from "react";
import PhoneOSService from "../../../../services/PhoneOSService";
import Toast1 from "../../../Toasts/Toast1";
import Toast2 from "../../../Toasts/Toast2";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import NavigationBarDashboard from "../../../layouts/Navigation/NavigationBarDashboard";
import CommonCheckAuth from "../../../../services/CommonCheckAuth";
import ServiceUser from "../../../../services/ServiceUser";
import {Redirect} from "react-router-dom";
// import data from "bootstrap/js/src/dom/data";

class EditOS extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.state.showNotAvailable = false;

        this.onChange = this.onChange.bind(this);
        this.updateOS = this.updateOS.bind(this);
        this.checkOSAvailability = this.checkOSAvailability.bind(this);

        //check whether the user is logged in
        const currentUser = ServiceUser.getCurrentUser();
        this.state.currentUser = currentUser;

        if (this.state.currentUser != null){
            this.state.loggedIn = 'yes';
        }
        else {
            this.state.loggedIn = 'no';
        }

    }

    initialState={
        id:'',
        os:'',
        isOsAvailable:''
    }

    componentDidMount = async () => {

        let id = this.props.match.params.id;
        this.setState({id: id});
        await PhoneOSService.getOSById(id)
            .then(response => response.data)
            .then((data) => {
                this.setState({os:data.name});
            }).catch(error => {
                console.log("Error in getting OS for ID. Error : ",error);
            })
    }

    onChange = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    updateOS = async (event) => {
        event.preventDefault();

        await this.checkOSAvailability();

        if (this.state.isOsAvailable == 'available'){
            let os = {
                id:this.state.id,
                name:this.state.os
            }

            await PhoneOSService.updateOS(os)
                .then(response => response.data)
                .then((data) => {

                    if(data != null){
                        this.setState({"show":true});
                        setTimeout(() => this.setState({"show":false}),3000);
                    }

                }).catch(error => {
                    console.log("Error in updating OS. Error : ",error);
                })
        }
        else if(this.state.isOsAvailable == 'notAvailable'){

            this.setState({"showNotAvailable":true});
            setTimeout(() => this.setState({"showNotAvailable":false}),3000);

        }
        else {
            console.log("Some other error");
        }
    }

    checkOSAvailability = async () =>{
        await PhoneOSService.isOSAvailable(this.state.os)
            .then(response => response.data)
            .then((data) => {
                if(data == true){
                    this.setState({isOsAvailable: 'available'});
                }
                else {
                    this.setState({isOsAvailable: 'notAvailable'});
                }
            }).catch(error => {
                console.log("Error in checking OS availability. Error : ",error);
            })
    }

    render() {
        const {os} = this.state;
        return (
            <div>

                {
                    this.state.loggedIn === 'no'?
                        <Redirect to={'login'}/>:
                        <div></div>
                }

                {
                    this.state.currentUser.roles != "ROLE_ADMIN"?
                        <Redirect to={"/no-permission"} />:
                        <div></div>
                }

                <NavigationBarDashboard />
            <div className={'container-fluid'}>

                <div style={{"display": this.state.show ? "block" : "none"}}>

                    <Toast1

                        children={{
                            show: this.state.show,
                            message: "OS updated successfully",
                            type: 'success'
                        }}
                    />

                </div>

                <div style={{"display": this.state.showNotAvailable ? "block" : "none"}}>

                    <Toast2

                        children={{
                            show: this.state.showNotAvailable,
                            message: "OS name is already taken",
                            type: 'warning'
                        }}
                    />

                </div>

                <h2>Update Phone OS</h2>

                <Form onSubmit={this.updateOS} >
                    <Card className={'bg-transparent'}>
                        <Card.Header className={'bg-warning'}>Update Phone OS</Card.Header>
                        <Card.Body>
                            <Form.Group>
                                <Form.Label>OS</Form.Label>
                                <Form.Control
                                    required
                                    type={'text'}
                                    name={'os'}
                                    placeholder={'Enter OS'}
                                    defaultValue={os}
                                    onChange={this.onChange}

                                />
                            </Form.Group>
                        </Card.Body>
                        <Card.Footer>
                            <Row>
                                <Col>
                                    <Button type={'submit'} className={'btn btn-success'}>Update OS</Button>
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Card>
                </Form>

            </div>
            </div>
        );
    }

}
export default EditOS;