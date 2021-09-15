import React, {Component} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";

import ServiceLaptop from "../../../services/ServiceLaptop";
import ServiceLaptopBrand from "../../../services/ServiceLaptopBrand";
import ServiceLaptopGraphic from "../../../services/ServiceLaptopGraphic";
import ServiceLaptopOS from "../../../services/ServiceLaptopOS";
import ServiceLaptopProcessor from "../../../services/ServiceLaptopProcessor";

import NavigationBarDashboard from "../../layouts/Navigation/NavigationBarDashboard";
import LaptopUpdateBodyWall from "../../layouts/Laptop/LaptopUpdateBodyWall";

class LaptopEdit extends Component {

    divBack = {
        backgroundColor: '#212121'
    }

    divSection = {
        margin: '20px',
        padding: '20px',
        borderRadius: '25px',
        backgroundColor: '#ffffff'
    }

    textStyleH1 = {
        textAlign: 'center',
        marginBottom: '50px',
        marginTop: '50px',
    }

    divBox = {
        height: '10px'
    }

    // TODO: Initializing state values and functions
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            lid: '',
            getBrand: [],
            getGraphic: [],
            getOS: [],
            getProcessor: []
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onChange = this.onChange.bind(this);

        this.onSelectBrand = this.onSelectBrand.bind(this);
        this.onSelectGraphic = this.onSelectGraphic.bind(this);
        this.onSelectOS = this.onSelectOS.bind(this);
        this.onSelectProcessor = this.onSelectProcessor.bind(this);
        this.onSelectRamType = this.onSelectRamType.bind(this);
        this.onSelectRamCapacity = this.onSelectRamCapacity.bind(this);
        this.onSelectStorageFirstCapacity = this.onSelectStorageFirstCapacity.bind(this);
        this.onSelectStorageSecondCapacity = this.onSelectStorageSecondCapacity.bind(this);
        this.onSelectDisplayRefreshRate = this.onSelectDisplayRefreshRate.bind(this);
        this.onSelectGraphicCapacity = this.onSelectGraphicCapacity.bind(this);

    }

    // TODO: Initializing default values
    initialState = {
        id: '',
        user: '',
        datetime: '',
        status: '',
        name: '',
        type: '',
        year: '',
        brand: '',
        os: '',
        model: '',
        processorname: '',
        processordetails: '',
        processorgeneration: '',
        chipset: '',
        ramtype: '',
        ramcapacity: '',
        ramslotstype: '',
        ramslotscount: '',
        storagefirst: '',
        storagefirstcapacity: '',
        storagesecond: '',
        storagesecondcapacity: '',
        displaysizeresolution: '',
        displayrefreshrate: '',
        displaytype: '',
        graphicbrand: '',
        graphicmodel: '',
        graphiccapacity: '',
        graphicdetails: '',
        webcam: '',
        keyboard: '',
        communication: '',
        audio: '',
        ioports: '',
        battery: '',
        dimension: '',
        weight: '',
        color: '',
        image: ''
    }

    componentDidMount = async () => {
        const {match: {params}} = this.props;
        this.setState({
            lid: params.lid
        });

        await ServiceLaptop.getLaptopObjectById(params.lid)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    user: response.data.user,
                    datetime: response.data.datetime,
                    status: response.data.status,
                    name: response.data.name,
                    type: response.data.type,
                    year: response.data.year,
                    brand: response.data.brand,
                    os: response.data.os,
                    model: response.data.model,
                    processorname: response.data.processorname,
                    processordetails: response.data.processordetails,
                    processorgeneration: response.data.processorgeneration,
                    chipset: response.data.chipset,
                    ramtype: response.data.ramtype,
                    ramcapacity: response.data.ramcapacity,
                    ramslotstype: response.data.ramslotstype,
                    ramslotscount: response.data.ramslotscount,
                    storagefirst: response.data.storagefirst,
                    storagefirstcapacity: response.data.storagefirstcapacity,
                    storagesecond: response.data.storagesecond,
                    storagesecondcapacity: response.data.storagesecondcapacity,
                    displaysizeresolution: response.data.displaysizeresolution,
                    displayrefreshrate: response.data.displayrefreshrate,
                    displaytype: response.data.displaytype,
                    graphicbrand: response.data.graphicbrand,
                    graphicmodel: response.data.graphicmodel,
                    graphiccapacity: response.data.graphiccapacity,
                    graphicdetails: response.data.graphicdetails,
                    webcam: response.data.webcam,
                    keyboard: response.data.keyboard,
                    communication: response.data.communication,
                    audio: response.data.audio,
                    ioports: response.data.ioports,
                    battery: response.data.battery,
                    dimension: response.data.dimension,
                    weight: response.data.weight,
                    color: response.data.color,
                    image: response.data.image
                });
            }).catch(error => {
                console.log(error.message);
            });

        // TODO: GET ALL LAPTOP BRAND
        await ServiceLaptopBrand.getLaptopBrand()
            .then(response => response.data)
            .then((data) => {
                this.setState({getBrand: data});
            }).catch(error =>
                console.log(error.message)
            );

        // TODO: GET ALL LAPTOP GRAPHIC
        await ServiceLaptopGraphic.getLaptopGraphic()
            .then(response => response.data)
            .then((data) => {
                this.setState({getGraphic: data});
            }).catch(error =>
                console.log(error.message)
            );

        // TODO: GET ALL LAPTOP OS
        await ServiceLaptopOS.getLaptopOS()
            .then(response => response.data)
            .then((data) => {
                this.setState({getOS: data});
            }).catch(error =>
                console.log(error.message)
            );

        // TODO: GET ALL LAPTOP PROCESSOR
        await ServiceLaptopProcessor.getLaptopProcessor()
            .then(response => response.data)
            .then((data) => {
                this.setState({getProcessor: data});
            }).catch(error =>
                console.log(error.message)
            );
    }

    // TODO: Assign Brand values to State variables
    onSelectBrand = (event) => {
        this.setState({brand: event.target.value});
    }

    // TODO: Assign Graphic values to State variables
    onSelectGraphic = (event) => {
        this.setState({graphicbrand: event.target.value});
    }

    // TODO: Assign OS values to State variables
    onSelectOS = (event) => {
        this.setState({os: event.target.value});
    }

    // TODO: Assign Processor values to State variables
    onSelectProcessor = (event) => {
        this.setState({processorname: event.target.value});
    }

    // TODO: Assign RAM Type values to State variables
    onSelectRamType = (event) => {
        this.setState({ramtype: event.target.value});
    }

    // TODO: Assign RAM Capacity values to State variables
    onSelectRamCapacity = (event) => {
        this.setState({ramcapacity: event.target.value});
    }

    // TODO: Assign 1 Storage Capacity values to State variables
    onSelectStorageFirstCapacity = (event) => {
        this.setState({storagefirstcapacity: event.target.value});
    }

    // TODO: Assign 2 Storage Capacity values to State variables
    onSelectStorageSecondCapacity = (event) => {
        this.setState({storagesecondcapacity: event.target.value});
    }

    // TODO: Assign Display Refresh Rate values to State variables
    onSelectDisplayRefreshRate = (event) => {
        this.setState({displayrefreshrate: event.target.value});
    }

    // TODO: Assign Graphic Capacity values to State variables
    onSelectGraphicCapacity = (event) => {
        this.setState({graphiccapacity: event.target.value});
    }

    // TODO: Assign form values to State variables
    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // TODO: Submit form values
    onSubmit = async (event) => {
        event.preventDefault();

        let value = {
            id: this.state.lid,
            user: "Admin",
            status: "Deactivate",
            name: this.state.name,
            type: this.state.type,
            year: this.state.year,
            brand: this.state.brand,
            os: this.state.os,
            model: this.state.model,
            processorname: this.state.processorname,
            processordetails: this.state.processordetails,
            processorgeneration: this.state.processorgeneration,
            chipset: this.state.chipset,
            ramtype: this.state.ramtype,
            ramcapacity: this.state.ramcapacity,
            ramslotstype: this.state.ramslotstype,
            ramslotscount: this.state.ramslotscount,
            storagefirst: this.state.storagefirst,
            storagefirstcapacity: this.state.storagefirstcapacity,
            storagesecond: this.state.storagesecond,
            storagesecondcapacity: this.state.storagesecondcapacity,
            displaysizeresolution: this.state.displaysizeresolution,
            displayrefreshrate: this.state.displayrefreshrate,
            displaytype: this.state.displaytype,
            graphicbrand: this.state.graphicbrand,
            graphicmodel: this.state.graphicmodel,
            graphiccapacity: this.state.graphiccapacity,
            graphicdetails: this.state.graphicdetails,
            webcam: this.state.webcam,
            keyboard: this.state.keyboard,
            communication: this.state.communication,
            audio: this.state.audio,
            ioports: this.state.ioports,
            battery: this.state.battery,
            dimension: this.state.dimension,
            weight: this.state.weight,
            color: this.state.color
        }

        console.log(value);

        // TODO: Save value in database
        await ServiceLaptop.updateLaptop(value)
            .then(response => response.data)
            .then((data) => {
                console.log(data);
            })
            .catch(function (error) {
                console.log(error.message);
            });

        await this.componentDidMount();
    }

    // TODO: Reset form values
    onReset = () => {
        this.setState(() => this.initialState)
    }

    render() {
        return (
            <div style={this.divBack}>
                <NavigationBarDashboard/>
                <LaptopUpdateBodyWall/>

                <section>

                </section>

                <section>
                    <Form onSubmit={this.onSubmit.bind(this)} onReset={this.onReset.bind(this)}>

                        <section style={this.divSection}>
                            <h3>Basic Details</h3>
                            <Form.Group as={Row} controlId="BasicDetails1" className={'pt-3'}>
                                <Col>
                                    <Form.Control placeholder="Laptop Name"
                                                  name="name"
                                                  required
                                                  value={this.state.name}
                                                  onChange={this.onChange}/>
                                </Col>
                                <Col>
                                    <Form.Control required as="select"
                                                  name={'brand'}
                                                  value={this.state.brand}
                                                  onChange={this.onSelectBrand}>

                                        <option>Brand</option>
                                        {this.state.getBrand.map(item => (
                                            <option key={item.id} value={item.name}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="BasicDetails2" className={'pt-3'}>
                                <Col>
                                    <Form.Control placeholder="Model"
                                                  name="model"
                                                  required
                                                  value={this.state.model}
                                                  onChange={this.onChange}/>
                                </Col>
                                <Col>
                                    <Form.Control placeholder="Manufactured Year"
                                                  name="year"
                                                  type="number"
                                                  required
                                                  value={this.state.year}
                                                  onChange={this.onChange}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="BasicDetails3" className={'pt-3'}>
                                <Col>
                                    <Form.Control required as="select"
                                                  name={'os'}
                                                  value={this.state.os}
                                                  onChange={this.onSelectOS}>

                                        <option>Operating System</option>
                                        {this.state.getOS.map(item => (
                                            <option key={item.id} value={item.name}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Col>
                                <Col>
                                    <Form.Control placeholder="Major Type"
                                                  name="type"
                                                  required
                                                  value={this.state.type}
                                                  onChange={this.onChange}/>
                                </Col>
                            </Form.Group>

                            <div className={'pt-3'}/>
                            <h3>CPU & Chipset</h3>

                            <Form.Group as={Row} controlId="cpu&chipset1" className={'pt-3'}>
                                <Col>
                                    <Form.Control required as="select"
                                                  name={'processorname'}
                                                  value={this.state.processorname}
                                                  onChange={this.onSelectProcessor}>

                                        <option>Processor</option>
                                        {this.state.getProcessor.map(item => (
                                            <option key={item.id} value={item.name}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Col>
                                <Col>
                                    <Form.Control placeholder="Processor Details"
                                                  name="processordetails"
                                                  required
                                                  value={this.state.processordetails}
                                                  onChange={this.onChange}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="cpu&chipset2" className={'pt-3'}>
                                <Col>
                                    <Form.Control placeholder="Generation"
                                                  name="processorgeneration"
                                                  required
                                                  value={this.state.processorgeneration}
                                                  onChange={this.onChange}/>
                                </Col>
                                <Col>
                                    <Form.Control placeholder="Chipset"
                                                  name="chipset"
                                                  required
                                                  value={this.state.chipset}
                                                  onChange={this.onChange}/>
                                </Col>
                            </Form.Group>

                            <div className={'pt-3'}/>
                            <h3>Memory</h3>

                            <Form.Group as={Row} controlId="memory1" className={'pt-3'}>
                                <Col>
                                    <Form.Control required as="select"
                                                  name={'ramtype'}
                                                  value={this.state.ramtype}
                                                  onChange={this.onSelectRamType}>

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
                                    </Form.Control>
                                </Col>
                                <Col>
                                    <Form.Control required as="select"
                                                  name={'ramcapacity'}
                                                  value={this.state.ramcapacity}
                                                  onChange={this.onSelectRamCapacity}>
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
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="memory2" className={'pt-3'}>
                                <Col>
                                    <Form.Control placeholder="Memory Slot Type"
                                                  name="ramslotstype"
                                                  required
                                                  value={this.state.ramslotstype}
                                                  onChange={this.onChange}/>
                                </Col>
                                <Col>
                                    <Form.Control placeholder="No Of Memory Slot"
                                                  name="ramslotscount"
                                                  type="number"
                                                  required
                                                  value={this.state.ramslotscount}
                                                  onChange={this.onChange}/>
                                </Col>
                            </Form.Group>

                            <div className={'pt-3'}/>
                            <h3>Storage</h3>

                            <Form.Group as={Row} controlId="storage1" className={'pt-3'}>
                                <Col>
                                    <Form.Control placeholder="Bootable Storage Type"
                                                  name="storagefirst"
                                                  required
                                                  value={this.state.storagefirst}
                                                  onChange={this.onChange}/>
                                </Col>
                                <Col>
                                    <Form.Control required as="select"
                                                  name={'storagefirstcapacity'}
                                                  value={this.state.storagefirstcapacity}
                                                  onChange={this.onSelectStorageFirstCapacity}>
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
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="storage2" className={'pt-3'}>
                                <Col>
                                    <Form.Control placeholder="Secondary Storage Type"
                                                  name="storagesecond"
                                                  required
                                                  value={this.state.storagesecond}
                                                  onChange={this.onChange}/>
                                </Col>
                                <Col>
                                    <Form.Control required as="select"
                                                  name={'storagesecondcapacity'}
                                                  value={this.state.storagesecondcapacity}
                                                  onChange={this.onSelectStorageSecondCapacity}>
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
                                        <option>-</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <div className={'pt-3'}/>
                            <h3>Display</h3>

                            <Form.Group as={Row} controlId="display1" className={'pt-3'}>
                                <Col>
                                    <Form.Control placeholder="Display Size & Resolution"
                                                  name="displaysizeresolution"
                                                  required
                                                  value={this.state.displaysizeresolution}
                                                  onChange={this.onChange}/>
                                </Col>
                                <Col>
                                    <Form.Control required as="select"
                                                  name={'displayrefreshrate'}
                                                  value={this.state.displayrefreshrate}
                                                  onChange={this.onSelectDisplayRefreshRate}>
                                        <option>Display Refresh Rate</option>
                                        <option>30Hz</option>
                                        <option>60Hz</option>
                                        <option>120Hz</option>
                                        <option>144Hz</option>
                                        <option>240Hz</option>
                                        <option>300Hz</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="display2" className={'pt-3'}>
                                <Col>
                                    <Form.Control placeholder="Display Type"
                                                  name="displaytype"
                                                  required
                                                  value={this.state.displaytype}
                                                  onChange={this.onChange}/>
                                </Col>
                                <Col>
                                </Col>
                            </Form.Group>

                            <div className={'pt-3'}/>
                            <h3>Graphics</h3>

                            <Form.Group as={Row} controlId="graphic1" className={'pt-3'}>
                                <Col>
                                    <Form.Control required as="select"
                                                  name={'graphicbrand'}
                                                  value={this.state.graphicbrand}
                                                  onChange={this.onSelectGraphic}>

                                        <option>Graphic Brand</option>
                                        {this.state.getGraphic.map(item => (
                                            <option key={item.id} value={item.name}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Col>

                                <Col>
                                    <Form.Control placeholder="Model"
                                                  name="graphicmodel"
                                                  required
                                                  value={this.state.graphicmodel}
                                                  onChange={this.onChange}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="graphic2" className={'pt-3'}>
                                <Col>
                                    <Form.Control required as="select"
                                                  name={'graphiccapacity'}
                                                  value={this.state.graphiccapacity}
                                                  onChange={this.onSelectGraphicCapacity}>
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
                                    </Form.Control>
                                </Col>

                                <Col>
                                    <Form.Control placeholder="Graphic Card Details"
                                                  name="graphicdetails"
                                                  required
                                                  value={this.state.graphicdetails}
                                                  onChange={this.onChange}/>
                                </Col>
                            </Form.Group>

                            <div className={'pt-3'}/>
                            <h3>Others</h3>

                            <Form.Group as={Row} controlId="other1" className={'pt-3'}>
                                <Col>
                                    <Form.Control placeholder="Webcam"
                                                  name="webcam"
                                                  required
                                                  value={this.state.webcam}
                                                  onChange={this.onChange}/>
                                </Col>
                                <Col>
                                    <Form.Control placeholder="Keyboard"
                                                  name="keyboard"
                                                  required
                                                  value={this.state.keyboard}
                                                  onChange={this.onChange}/>
                                </Col>
                            </Form.Group>


                            <Form.Group as={Row} controlId="other2" className={'pt-3'}>
                                <Col>
                                    <Form.Control placeholder="Communication"
                                                  name="communication"
                                                  required
                                                  value={this.state.communication}
                                                  onChange={this.onChange}/>
                                </Col>
                                <Col>
                                    <Form.Control placeholder="Audio"
                                                  name="audio"
                                                  required
                                                  value={this.state.audio}
                                                  onChange={this.onChange}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="other3" className={'pt-3'}>
                                <Col>
                                    <Form.Control placeholder="Battery"
                                                  name="battery"
                                                  required
                                                  value={this.state.battery}
                                                  onChange={this.onChange}/>
                                </Col>
                                <Col>
                                    <Form.Control placeholder="Dimension"
                                                  name="dimension"
                                                  required
                                                  value={this.state.dimension}
                                                  onChange={this.onChange}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="other4" className={'pt-3'}>
                                <Col>
                                    <Form.Control placeholder="Weight"
                                                  name="weight"
                                                  required
                                                  value={this.state.weight}
                                                  onChange={this.onChange}/>
                                </Col>
                                <Col>
                                    <Form.Control placeholder="Color"
                                                  name="color"
                                                  required
                                                  value={this.state.color}
                                                  onChange={this.onChange}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="other5" className={'pt-3'}>
                                <Col>
                                    <Form.Control placeholder="I/O Port"
                                                  name="ioports"
                                                  required
                                                  as="textarea"
                                                  rows={10}
                                                  value={this.state.ioports}
                                                  onChange={this.onChange}/>
                                </Col>
                                <Col>
                                </Col>
                            </Form.Group>

                            <div className={'pt-3'}/>
                            <Form.Group as={Row} className={'pt-2'}>
                                <Col>
                                    <Button type="submit" className="btn-success">SAVE</Button>{'\u00A0'}
                                    <Button type="reset" className="btn-danger">RESET</Button>{'\u00A0'}
                                    <Button className="btn-secondary">^</Button>{'\u00A0'}
                                </Col>
                            </Form.Group>
                        </section>
                    </Form>
                </section>
            </div>
        );
    }
}

export default LaptopEdit;