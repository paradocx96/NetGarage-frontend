import React, {Component} from 'react';

import NavigationBarDashboard from "../../layouts/Navigation/NavigationBarDashboard";
import LaptopAddBodyWall from "./LaptopAddBodyWall";
import {Button, Col, Form, Row} from "react-bootstrap";

class LaptopAdd extends Component {

    divBack = {
        'background-color': '#212121'
    }

    divSection = {
        margin: '20px',
        padding: '20px',
        borderRadius: '25px',
        'background-color': '#ffffff'
    }

    textStyleH1 = {
        textAlign: 'center',
        marginBottom: '50px',
        marginTop: '50px',
    }

    // TODO: Initializing state values and functions
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            getSubject: [],
            options: []
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSelectSubject = this.onSelectSubject.bind(this);
    }

    // TODO: Initializing default values
    initialState = {
        user : "Admin",
        status : "Deactivate",
        name : '',
        type : '',
        year : 2000,
        brand : '',
        os : '',
        model : '',
        processorname : '',
        processordetails : '',
        processorgeneration : '',
        chipset : '',
        ramtype : '',
        ramcapacity : '',
        ramslotstype : '',
        ramslotscount : 0,
        storagefirst : '',
        storagefirstcapacity : '',
        storagesecond : '',
        storagesecondcapacity : '',
        displaysizeresolution : '',
        displayrefreshrate : '',
        displaytype : '',
        graphicbrand : '',
        graphicmodel : '',
        graphiccapacity : '',
        graphicdetails : '',
        webcam : '',
        keyboard : '',
        communication : '',
        audio : '',
        ioports : '',
        battery : '',
        dimension : '',
        weight : '',
        color : ''
    }

    componentDidMount = async () => {
        // await ServiceSubject.getSubjectAll()
        //     .then(response => {
        //         this.setState({getSubject: response.data}, () => {
        //             let dt = [];
        //             this.state.getSubject.map((item, index) => {
        //                 let sub = {
        //                     value: item.id,
        //                     label: item.name
        //                 }
        //                 dt.push(sub)
        //             });
        //             this.setState({
        //                 options: dt
        //             });
        //         })
        //     }).catch(error => {
        //         console.log(error.message);
        //     })
    }

    // TODO: Assign form values to State variables
    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // TODO: Assign form values to State variables
    onSelectSubject(event) {
        this.setState({
            subjects: event ? event.map(item => item.label) : []
        });
    }

    // TODO: Submit form values
    onSubmit = async (event) => {
        event.preventDefault();

        let value = {

        }

        // TODO: Save value in database
        // await ServiceTeacher.postTeacher(value)
        //     .then(response => response.data)
        //     .then((data) => {
        //         console.log(data);
        //     })
        //     .catch(function (error) {
        //         console.log(error.message);
        //     });

        this.onReset();
    }

    // TODO: Reset form values
    onReset = () => {
        this.setState(() => this.initialState)
    }

    render() {
        return (
            <div style={this.divBack}>
                <NavigationBarDashboard/>
                <LaptopAddBodyWall/>

                <Form onSubmit={this.onSubmit.bind(this)} onReset={this.onReset.bind(this)}>

                    <section style={this.divSection}>
                        <h3>Basic Details</h3>
                        <Form.Group as={Row} controlId="BasicDetails1" className={'pt-3'}>
                            <Col>
                                <Form.Control placeholder="Laptop Name"
                                              name="name"
                                              value={this.state.name}
                                              onChange={this.onChange}/>
                            </Col>
                            <Col>
                                <Form.Select>
                                    <option>Brand</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="BasicDetails2" className={'pt-3'}>
                            <Col>
                                <Form.Control placeholder="Model"
                                              name="model"
                                              value={this.state.model}
                                              onChange={this.onChange}/>
                            </Col>
                            <Col>
                                <Form.Control placeholder="Manufactured Year"
                                              name="year"
                                              value={this.state.year}
                                              onChange={this.onChange}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="BasicDetails3" className={'pt-3'}>
                            <Col>
                                <Form.Select>
                                    <option>Operating System</option>
                                </Form.Select>
                            </Col>
                            <Col>
                            </Col>
                        </Form.Group>

                    </section>

                    <section style={this.divSection}>
                        <h3>CPU & Chipset</h3>

                        <Form.Group as={Row} controlId="cpu&chipset1" className={'pt-3'}>
                            <Col>
                                <Form.Select>
                                    <option>Processor</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Control placeholder="Processor Details"
                                              name="processordetails"
                                              value={this.state.processordetails}
                                              onChange={this.onChange}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="cpu&chipset2" className={'pt-3'}>
                            <Col>
                                <Form.Control placeholder="Generation"
                                              name="processorgeneration"
                                              value={this.state.processorgeneration}
                                              onChange={this.onChange}/>
                            </Col>
                            <Col>
                                <Form.Control placeholder="Chipset"
                                              name="chipset"
                                              value={this.state.chipset}
                                              onChange={this.onChange}/>
                            </Col>
                        </Form.Group>
                    </section>

                    <section style={this.divSection}>
                        <h3>Memory</h3>
                        <Form.Group as={Row} controlId="memory1" className={'pt-3'}>
                            <Col>
                                <Form.Select>
                                    <option>Memory Type</option>
                                    <option>DDR4-2400 PC4-19200</option>
                                    <option>DDR4-2666 PC4-21300</option>
                                    <option>DDR4-2933 PC4-23400</option>
                                    <option>DDR4-3000 PC4-24000</option>
                                    <option>DDR4-3200 PC4-25600</option>
                                    <option>DDR4-3200 PC4-25600</option>
                                    <option>DDR4-4000 PC4-32000</option>
                                    <option>DDR4-4400 PC4-35200</option>
                                    <option>DDR3-800 PC3-6400</option>
                                    <option>DDR3-1066 PC3-8500</option>
                                    <option>DDR3-1333 PC3-10600</option>
                                    <option>DDR3-1600 PC3-12800</option>
                                    <option>DDR2-800 PC2-6400</option>
                                    <option>DDR2-1000 PC2-8000</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Select>
                                    <option>Maximum Memory Capacity</option>
                                    <option>1TB</option>
                                    <option>512GB</option>
                                    <option>256GB</option>
                                    <option>128GB</option>
                                    <option>64GB</option>
                                    <option>32GB</option>
                                    <option>16GB</option>
                                    <option>8GB</option>
                                    <option>4GB</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="memory2" className={'pt-3'}>
                            <Col>
                                <Form.Control placeholder="Memory Slot Type"
                                              name="ramslotstype"
                                              value={this.state.ramslotstype}
                                              onChange={this.onChange}/>
                            </Col>
                            <Col>
                                <Form.Control placeholder="No Of Memory Slot"
                                              name="ramslotscount"
                                              value={this.state.ramslotscount}
                                              onChange={this.onChange}/>
                            </Col>
                        </Form.Group>
                    </section>

                    <section style={this.divSection}>
                        <h3>Storage</h3>

                        <Form.Group as={Row} controlId="storage1" className={'pt-3'}>
                            <Col>
                                <Form.Control placeholder="Bootable Storage Type"
                                              name="storagefirst"
                                              value={this.state.storagefirst}
                                              onChange={this.onChange}/>
                            </Col>
                            <Col>
                                <Form.Select>
                                    <option>Bootable Storage Capacity</option>
                                    <option>10TB</option>
                                    <option>4TB</option>
                                    <option>2TB</option>
                                    <option>1TB</option>
                                    <option>500GB</option>
                                    <option>320GB</option>
                                    <option>256GB</option>
                                    <option>250GB</option>
                                    <option>128GB</option>
                                    <option>120GB</option>
                                    <option>64GB</option>
                                    <option>32GB</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="storage2" className={'pt-3'}>
                            <Col>
                                <Form.Control placeholder="Secondary Storage Type"
                                              name="storagesecond"
                                              value={this.state.storagesecond}
                                              onChange={this.onChange}/>
                            </Col>
                            <Col>
                                <Form.Select>
                                    <option>Secondary Storage Capacity</option>
                                    <option>10TB</option>
                                    <option>4TB</option>
                                    <option>2TB</option>
                                    <option>1TB</option>
                                    <option>500GB</option>
                                    <option>320GB</option>
                                    <option>256GB</option>
                                    <option>250GB</option>
                                    <option>128GB</option>
                                    <option>120GB</option>
                                    <option>64GB</option>
                                    <option>32GB</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                    </section>

                    <section style={this.divSection}>
                        <h3>Display</h3>

                        <Form.Group as={Row} controlId="display1" className={'pt-3'}>
                            <Col>
                                <Form.Control placeholder="Display Size & Resolution"
                                              name="displaysizeresolution"
                                              value={this.state.displaysizeresolution}
                                              onChange={this.onChange}/>
                            </Col>
                            <Col>
                                <Form.Select>
                                    <option>Display Refresh Rate</option>
                                    <option>30Hz</option>
                                    <option>60Hz</option>
                                    <option>120Hz</option>
                                    <option>144Hz</option>
                                    <option>240Hz</option>
                                    <option>300Hz</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="display2" className={'pt-3'}>
                            <Col>
                                <Form.Control placeholder="Display Type"
                                              name="displaytype"
                                              value={this.state.displaytype}
                                              onChange={this.onChange}/>
                            </Col>
                            <Col>
                            </Col>
                        </Form.Group>

                    </section>

                    <section style={this.divSection}>
                        <h3>Graphics</h3>

                        <Form.Group as={Row} controlId="graphic1" className={'pt-3'}>
                            <Col>
                                <Form.Select>
                                    <option>Graphic Brand</option>
                                </Form.Select>
                            </Col>

                            <Col>
                                <Form.Control placeholder="Model"
                                              name="graphicmodel"
                                              value={this.state.graphicmodel}
                                              onChange={this.onChange}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="graphic2" className={'pt-3'}>
                            <Col>
                                <Form.Select>
                                    <option>Memory Capacity</option>
                                    <option>32MB</option>
                                    <option>64MB</option>
                                    <option>128MB</option>
                                    <option>256MB</option>
                                    <option>512MB</option>
                                    <option>1GB</option>
                                    <option>2GB</option>
                                    <option>3GB</option>
                                    <option>4GB</option>
                                    <option>6GB</option>
                                    <option>8GB</option>
                                    <option>10GB</option>
                                    <option>11GB</option>
                                    <option>12GB</option>
                                    <option>24GB</option>
                                </Form.Select>
                            </Col>

                            <Col>
                                <Form.Control placeholder="Graphic Card Details"
                                              name="graphicdetails"
                                              value={this.state.graphicdetails}
                                              onChange={this.onChange}/>
                            </Col>
                        </Form.Group>
                    </section>

                    <section style={this.divSection}>
                        <h3>Others</h3>
                    </section>

                    <section style={this.divSection}>
                        <Button>Add</Button>
                    </section>


                </Form>
            </div>
        );
    }
}

export default LaptopAdd;