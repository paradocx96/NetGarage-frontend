import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";

import PhoneService from "../../../../services/PhoneService";

class ComparePhones extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;

        this.onChange = this.onChange.bind(this);
        this.searchPhone1 = this.searchPhone1.bind(this);
        this.searchPhone2 = this.searchPhone2.bind(this);
        this.loadPhone1 = this.loadPhone1.bind(this);
        this.loadPhone2 = this.loadPhone2.bind(this);

    }
    initialState={
        phones:[],
        phones2:[],
        selectedPhone:'',
        firstPhone:'',
        selectedFirstPhone:'',
        secondPhone:'',
        selectedSecondPhone:'',
        displayPhone1:'',
        displayPhone2:''
    }

    onChange = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }


    searchPhone1 =async (event) => {

        await PhoneService.getPhoneByName(this.state.firstPhone)
            .then(response => response.data)
            .then((data) => {
                this.setState({phones:data});
                this.setState({selectedFirstPhone:data[0].id});
            }).catch(error => {
                console.log("Cannot get phones for field 1. Error: ",error)
            });

    }

    searchPhone2 = async (even) => {
        await PhoneService.getPhoneByName(this.state.secondPhone)
            .then(response => response.data)
            .then((data) => {
                this.setState({phones2:data});
                this.setState({selectedSecondPhone:data[0].id});
            }).catch(error => {
                console.log("Cannot get phones for field 2. Error: ",error)
            });
    }

    loadPhone1 = async () => {
        await PhoneService.getPhoneById(this.state.selectedFirstPhone)
            .then(response => response.data)
            .then((data) => {
                this.setState({displayPhone1:data});
            }).catch(error => {
                console.log("Cannot get phone 1 for Id. Error: ",error);
            })
    }

    loadPhone2 = async () => {
        await PhoneService.getPhoneById(this.state.selectedSecondPhone)
            .then(response => response.data)
            .then((data) => {
                this.setState({displayPhone2:data});
            }).catch(error => {
                console.log("Cannot get phone 1 for Id. Error: ",error);
            })
    }

    render() {
        const {firstPhone, secondPhone, selectedFirstPhone, selectedSecondPhone} = this.state;
        return (
            <div className={'container-fluid'}>
                <h3>Compare Phones</h3>
                <Row>
                    <Col>
                        <Row>
                            <Col>

                                <Form.Group>
                                   {/* <Form.Label>Enter First Phone</Form.Label>*/}
                                    <Form.Control
                                        required
                                        type={'text'}
                                        name={'firstPhone'}
                                        value={firstPhone}
                                        placeholder={'Search phones'}
                                        onChange={this.onChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Button
                                    className={'btn btn-primary'}
                                    onClick={this.searchPhone1}
                                >
                                    Search
                                </Button>
                            </Col>
                        </Row>

                        <br/>
                        <Row>

                            <Form.Label>Select Phone</Form.Label>
                        </Row>

                        <Row>
                            <Col>

                                <Form.Group>
                                    <Form.Control
                                        as={'select'}
                                        required
                                        name={'selectedFirstPhone'}
                                        value={selectedFirstPhone}
                                        onChange={this.onChange}
                                    >
                                        {
                                            this.state.phones.length === 0?
                                                <option>No Phones for this search</option>:
                                                this.state.phones.map((e) => (
                                                    <option value={e.id}>
                                                        {e.brandmodel}
                                                    </option>
                                                ))
                                        }

                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Button
                                    className={'btn btn-secondary'}
                                    onClick={this.loadPhone1}
                                >
                                    Load Phone
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            {/*Here goes Phone*/}
                            {
                                this.state.displayPhone1.id
                            }
                        </Row>
                    </Col>
                    <Col>
                        <Row>

                            <Col>

                                <Form.Group>
                                    {/*<Form.Label>Enter Second Phone</Form.Label>*/}
                                    <Form.Control
                                        required
                                        type={'text'}
                                        name={'secondPhone'}
                                        value={secondPhone}
                                        placeholder={'Search'}
                                        onChange={this.onChange}
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Button
                                    onClick={this.searchPhone2}
                                >
                                    Search
                                </Button>
                            </Col>


                        </Row>

                        <br/>

                        <Row>
                            <Form.Label>Select Phone</Form.Label>
                        </Row>

                        <Row>
                            <Col>

                                <Form.Group>
                                    <Form.Control
                                        as={'select'}
                                        required
                                        name={'selectedSecondPhone'}
                                        value={selectedSecondPhone}
                                        onChange={this.onChange}
                                    >
                                        {
                                            this.state.phones2.length === 0?
                                                <option>No Phones for this search</option>:
                                                this.state.phones2.map((e) => (
                                                    <option value={e.id}>
                                                        {e.brandmodel}
                                                    </option>
                                                ))
                                        }

                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Button
                                    onClick={this.loadPhone2}
                                >
                                    Load Phone
                                </Button>
                            </Col>
                        </Row>

                        <Row>
                            {
                                this.state.displayPhone2.id
                            }
                        </Row>

                    </Col>
                </Row>
            </div>
        );
    }

}
export default ComparePhones;