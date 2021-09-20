import React from "react";
import PhoneOSService from "../../../../services/PhoneOSService";
import Toast1 from "../../../Toasts/Toast1";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import Toast2 from "../../../Toasts/Toast2";
import NavigationBarDashboard from "../../../layouts/Navigation/NavigationBarDashboard";
import CommonCheckAuth from "../../../../services/CommonCheckAuth";
// import data from "bootstrap/js/src/dom/data";

class AddOS extends React.Component{
    constructor(props) {
        super(props);
        this.state =  this.initialState;
        this.state.show = false;
        this.state.showNotAvailable = false;

        this.onChange = this.onChange.bind(this);
        this.submitOS = this.submitOS.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.checkOSAvailability = this.checkOSAvailability.bind(this);

    }

    initialState= {
        os:'',
        isOsAvailable : ''
    }

    onChange = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    submitOS = async ( event) => {

        event.preventDefault();

        await this.checkOSAvailability();

        if(this.state.isOsAvailable ==  'available'){

            let os = {
                name:this.state.os
            }

            console.log("OS object name : " + os.name);

            await PhoneOSService.addOS(os)
                .then(response => response.data)
                .then((data) => {
                    if (data != null){
                        console.log("Added os with id : ", data.id);
                        this.setState({"show":true});
                        setTimeout(() => this.setState({"show":false}),3000);
                    }
                }).catch(error => {
                    console.log("Error in adding OS. Error : ", error);
                });

            this.resetForm();

        }
        else if(this.state.isOsAvailable == 'notAvailable') {
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

    resetForm = () =>{
        //setting state to initial state
        this.setState({os:''});
    }

    render() {
        const {os} = this.state;
        return (
            <div>
                <NavigationBarDashboard />
            <div className={'container'}>

                <div style={{"display": this.state.show ? "block" : "none"}}>

                    <Toast1

                        children={{
                            show: this.state.show,
                            message: "OS added successfully",
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

                <h2>Add OS</h2>

                <Form onSubmit={this.submitOS} onReset={this.resetForm}>
                    <Card className={'bg-transparent'}>
                        <Card.Header className={'bg-success text-white'}>Add OS</Card.Header>
                        <Card.Body>
                            <Form.Group>
                                <Form.Label>OS</Form.Label>
                                <Form.Control
                                    required
                                    type={'text'}
                                    name={'os'}
                                    placeholder={'Enter OS'}
                                    value={os}
                                    onChange={this.onChange}

                                />
                            </Form.Group>
                        </Card.Body>
                        <Card.Footer>
                            <Row>
                                <Col>
                                    <Button type={'reset'} className={'btn btn-warning'}>Clear</Button>
                                </Col>

                                <Col>
                                    <Button type={'submit'} className={'btn btn-success'}>Add OS</Button>
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

export default CommonCheckAuth(AddOS) ;