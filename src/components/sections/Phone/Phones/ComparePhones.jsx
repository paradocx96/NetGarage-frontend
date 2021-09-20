import React from "react";
import {Button, Card, Col, Form, Row, Table} from "react-bootstrap";

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
                        <br/>
                        <Row className={'container-fluid'}>
                            {/*Here goes Phone*/}
                            {
                                this.state.displayPhone1 === ''?
                                    <div></div>:
                                    <div>
                                        <Card>
                                            <Card.Body>
                                                <img
                                                    width={'75'} height={'100'}
                                                    src={this.state.displayPhone1.image || "http://via.placeholder.com/300x200"}
                                                    alt={'firebase-image'}

                                                />
                                                <h5>{this.state.displayPhone1.brandmodel}</h5>
                                            </Card.Body>
                                        </Card>
                                        <Card>
                                            <Card.Header>
                                                Network
                                            </Card.Header>
                                            <Card.Body>
                                                <Table striped bordered hover variant={'light'}>
                                                    <tbody>
                                                    <tr>
                                                        <td>Network</td>
                                                        <td>{this.state.displayPhone1.network}</td>
                                                    </tr>
                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>

                                        <Card>
                                            <Card.Header>
                                                Body
                                            </Card.Header>
                                            <Card.Body>
                                                <Table striped bordered hover variant={'light'}>
                                                    <tbody>
                                                    <tr>
                                                        <td>Dimensions</td>
                                                        <td>{this.state.displayPhone1.dimensions}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Weight</td>
                                                        <td>{this.state.displayPhone1.weight}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>SIM</td>
                                                        <td>{this.state.displayPhone1.sim}</td>
                                                    </tr>
                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>

                                        <Card>
                                            <Card.Header>
                                                Display
                                            </Card.Header>
                                            <Card.Body>
                                                <Table striped bordered hover variant={'light'}>
                                                    <tbody>
                                                    <tr>
                                                        <td>Type</td>
                                                        <td>{this.state.displayPhone1.displaytype}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Size</td>
                                                        <td>{this.state.displayPhone1.displaysize}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Resolution</td>
                                                        <td>{this.state.displayPhone1.displayresolution}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Protection</td>
                                                        <td>{this.state.displayPhone1.displayprotection}</td>
                                                    </tr>
                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>

                                        <Card>
                                            <Card.Header>
                                                Software
                                            </Card.Header>
                                            <Card.Body>
                                                <Table striped bordered hover variant={'light'}>
                                                    <tbody>
                                                    <tr>
                                                        <td>OS</td>
                                                        <td>{this.state.displayPhone1.os}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Software Features</td>
                                                        <td>{this.state.displayPhone1.softwarefeatures}</td>
                                                    </tr>

                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>

                                        <Card>
                                            <Card.Header>
                                                Chipset
                                            </Card.Header>
                                            <Card.Body>
                                                <Table striped bordered hover variant={'light'}>
                                                    <tbody>
                                                    <tr>
                                                        <td>Chipset</td>
                                                        <td>{this.state.displayPhone1.chipset}</td>
                                                    </tr>

                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>

                                        <Card>
                                            <Card.Header>
                                                Storage
                                            </Card.Header>
                                            <Card.Body>
                                                <Table striped bordered hover variant={'light'}>
                                                    <tbody>
                                                    <tr>
                                                        <td>Memory and Storage</td>
                                                        <td>{this.state.displayPhone1.memorystorage}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Card</td>
                                                        <td>{this.state.displayPhone1.card}</td>
                                                    </tr>

                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>

                                        <Card>
                                            <Card.Header>
                                                Main Camera
                                            </Card.Header>
                                            <Card.Body>
                                                <Table striped bordered hover variant={'light'}>
                                                    <tbody>
                                                    <tr>
                                                        <td>Type</td>
                                                        <td>{this.state.displayPhone1.maincamera}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Details</td>
                                                        <td>{this.state.displayPhone1.maincameraDetails}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Video</td>
                                                        <td>{this.state.displayPhone1.maincameraVideo}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Features</td>
                                                        <td>{this.state.displayPhone1.maincameraFeatures}</td>
                                                    </tr>

                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>
                                        <Card>
                                            <Card.Header>
                                                Selfie Camera
                                            </Card.Header>
                                            <Card.Body>
                                                <Table striped bordered hover variant={'light'}>
                                                    <tbody>
                                                    <tr>
                                                        <td>Type</td>
                                                        <td>{this.state.displayPhone1.selfcamera}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Details</td>
                                                        <td>{this.state.displayPhone1.selfcameraDetails}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Video</td>
                                                        <td>{this.state.displayPhone1.selfcameraVideo}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Features</td>
                                                        <td>{this.state.displayPhone1.selfcameraFeatures}</td>
                                                    </tr>

                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>

                                        <Card>
                                            <Card.Header>
                                                Audio
                                            </Card.Header>
                                            <Card.Body>
                                                <Table striped bordered hover variant={'light'}>
                                                    <tbody>
                                                    <tr>
                                                        <td>Loudspeaker</td>
                                                        <td>{this.state.displayPhone1.loudspeaker}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Head Phone Jack</td>
                                                        <td>{this.state.displayPhone1.headphonejack}</td>
                                                    </tr>

                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>


                                        <Card>
                                            <Card.Header>
                                                Communications
                                            </Card.Header>
                                            <Card.Body>
                                                <Table striped bordered hover variant={'light'}>
                                                    <tbody>
                                                    <tr>
                                                        <td>WLAN</td>
                                                        <td>{this.state.displayPhone1.wlan}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Bluetooth</td>
                                                        <td>{this.state.displayPhone1.bluetooth}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>GPS</td>
                                                        <td>{this.state.displayPhone1.gps}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>NFC</td>
                                                        <td>{this.state.displayPhone1.nfc}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Radio</td>
                                                        <td>{this.state.displayPhone1.radio}</td>
                                                    </tr>

                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>

                                        <Card>
                                            <Card.Header>
                                                Sensors
                                            </Card.Header>
                                            <Card.Body>
                                                <Table striped bordered hover variant={'light'}>
                                                    <tbody>
                                                    <tr>
                                                        <td>Sensors</td>
                                                        <td>{this.state.displayPhone1.sensors}</td>
                                                    </tr>
                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>

                                        <Card>
                                            <Card.Header>
                                                Battery
                                            </Card.Header>
                                            <Card.Body>
                                                <Table striped bordered hover variant={'light'}>
                                                    <tbody>
                                                    <tr>
                                                        <td>Battery Type</td>
                                                        <td>{this.state.displayPhone1.batterytype}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Models</td>
                                                        <td>{this.state.displayPhone1.charging}</td>
                                                    </tr>
                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>

                                        <Card>
                                            <Card.Header>
                                                Miscellaneous
                                            </Card.Header>
                                            <Card.Body>
                                                <Table striped bordered hover variant={'light'}>
                                                    <tbody>
                                                    <tr>
                                                        <td>Colors</td>
                                                        <td>{this.state.displayPhone1.colors}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Models</td>
                                                        <td>{this.state.displayPhone1.models}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>SAR</td>
                                                        <td>{this.state.displayPhone1.sar}</td>
                                                    </tr>

                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>
                                    </div>

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

                        <br/>

                        <Row className={'container-fluid'}>
                            {
                                this.state.displayPhone2 === ''?
                                    <div></div>:
                                    <div>
                                        <Card>
                                            <Card.Body>
                                                <img
                                                    width={'75'} height={'100'}
                                                    src={this.state.displayPhone2.image || "http://via.placeholder.com/300x200"}
                                                    alt={'firebase-image'}

                                                />
                                                <h5>{this.state.displayPhone2.brandmodel}</h5>
                                            </Card.Body>
                                        </Card>
                                        <Card>
                                            <Card.Header>
                                                Network
                                            </Card.Header>
                                            <Card.Body>
                                                <Table striped bordered hover variant={'light'}>
                                                    <tbody>
                                                    <tr>
                                                        <td>Network</td>
                                                        <td>{this.state.displayPhone2.network}</td>
                                                    </tr>
                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>

                                        <Card>
                                            <Card.Header>
                                                Body
                                            </Card.Header>
                                            <Card.Body>
                                                <Table striped bordered hover variant={'light'}>
                                                    <tbody>
                                                    <tr>
                                                        <td>Dimensions</td>
                                                        <td>{this.state.displayPhone2.dimensions}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Weight</td>
                                                        <td>{this.state.displayPhone2.weight}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>SIM</td>
                                                        <td>{this.state.displayPhone2.sim}</td>
                                                    </tr>
                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>

                                        <Card>
                                            <Card.Header>
                                                Display
                                            </Card.Header>
                                            <Card.Body>
                                                <Table striped bordered hover variant={'light'}>
                                                    <tbody>
                                                    <tr>
                                                        <td>Type</td>
                                                        <td>{this.state.displayPhone2.displaytype}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Size</td>
                                                        <td>{this.state.displayPhone2.displaysize}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Resolution</td>
                                                        <td>{this.state.displayPhone2.displayresolution}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Protection</td>
                                                        <td>{this.state.displayPhone2.displayprotection}</td>
                                                    </tr>
                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>

                                        <Card>
                                            <Card.Header>
                                                Software
                                            </Card.Header>
                                            <Card.Body>
                                                <Table striped bordered hover variant={'light'}>
                                                    <tbody>
                                                    <tr>
                                                        <td>OS</td>
                                                        <td>{this.state.displayPhone2.os}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Software Features</td>
                                                        <td>{this.state.displayPhone2.softwarefeatures}</td>
                                                    </tr>

                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>

                                        <Card>
                                            <Card.Header>
                                                Chipset
                                            </Card.Header>
                                            <Card.Body>
                                                <Table striped bordered hover variant={'light'}>
                                                    <tbody>
                                                    <tr>
                                                        <td>Chipset</td>
                                                        <td>{this.state.displayPhone2.chipset}</td>
                                                    </tr>

                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>

                                        <Card>
                                            <Card.Header>
                                                Storage
                                            </Card.Header>
                                            <Card.Body>
                                                <Table striped bordered hover variant={'light'}>
                                                    <tbody>
                                                    <tr>
                                                        <td>Memory and Storage</td>
                                                        <td>{this.state.displayPhone2.memorystorage}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Card</td>
                                                        <td>{this.state.displayPhone2.card}</td>
                                                    </tr>

                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>

                                        <Card>
                                            <Card.Header>
                                                Main Camera
                                            </Card.Header>
                                            <Card.Body>
                                                <Table striped bordered hover variant={'light'}>
                                                    <tbody>
                                                    <tr>
                                                        <td>Type</td>
                                                        <td>{this.state.displayPhone2.maincamera}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Details</td>
                                                        <td>{this.state.displayPhone2.maincameraDetails}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Video</td>
                                                        <td>{this.state.displayPhone2.maincameraVideo}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Features</td>
                                                        <td>{this.state.displayPhone2.maincameraFeatures}</td>
                                                    </tr>

                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>
                                        <Card>
                                            <Card.Header>
                                                Selfie Camera
                                            </Card.Header>
                                            <Card.Body>
                                                <Table striped bordered hover variant={'light'}>
                                                    <tbody>
                                                    <tr>
                                                        <td>Type</td>
                                                        <td>{this.state.displayPhone2.selfcamera}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Details</td>
                                                        <td>{this.state.displayPhone2.selfcameraDetails}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Video</td>
                                                        <td>{this.state.displayPhone2.selfcameraVideo}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Features</td>
                                                        <td>{this.state.displayPhone2.selfcameraFeatures}</td>
                                                    </tr>

                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>

                                        <Card>
                                            <Card.Header>
                                                Audio
                                            </Card.Header>
                                            <Card.Body>
                                                <Table striped bordered hover variant={'light'}>
                                                    <tbody>
                                                    <tr>
                                                        <td>Loudspeaker</td>
                                                        <td>{this.state.displayPhone2.loudspeaker}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Head Phone Jack</td>
                                                        <td>{this.state.displayPhone2.headphonejack}</td>
                                                    </tr>

                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>


                                        <Card>
                                            <Card.Header>
                                                Communications
                                            </Card.Header>
                                            <Card.Body>
                                                <Table striped bordered hover variant={'light'}>
                                                    <tbody>
                                                    <tr>
                                                        <td>WLAN</td>
                                                        <td>{this.state.displayPhone2.wlan}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Bluetooth</td>
                                                        <td>{this.state.displayPhone2.bluetooth}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>GPS</td>
                                                        <td>{this.state.displayPhone2.gps}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>NFC</td>
                                                        <td>{this.state.displayPhone2.nfc}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Radio</td>
                                                        <td>{this.state.displayPhone2.radio}</td>
                                                    </tr>

                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>

                                        <Card>
                                            <Card.Header>
                                                Sensors
                                            </Card.Header>
                                            <Card.Body>
                                                <Table striped bordered hover variant={'light'}>
                                                    <tbody>
                                                    <tr>
                                                        <td>Sensors</td>
                                                        <td>{this.state.displayPhone2.sensors}</td>
                                                    </tr>
                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>

                                        <Card>
                                            <Card.Header>
                                                Battery
                                            </Card.Header>
                                            <Card.Body>
                                                <Table striped bordered hover variant={'light'}>
                                                    <tbody>
                                                    <tr>
                                                        <td>Battery Type</td>
                                                        <td>{this.state.displayPhone2.batterytype}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Models</td>
                                                        <td>{this.state.displayPhone2.charging}</td>
                                                    </tr>
                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>

                                        <Card>
                                            <Card.Header>
                                                Miscellaneous
                                            </Card.Header>
                                            <Card.Body>
                                                <Table striped bordered hover variant={'light'}>
                                                    <tbody>
                                                    <tr>
                                                        <td>Colors</td>
                                                        <td>{this.state.displayPhone2.colors}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Models</td>
                                                        <td>{this.state.displayPhone2.models}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>SAR</td>
                                                        <td>{this.state.displayPhone2.sar}</td>
                                                    </tr>

                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>
                                    </div>
                            }
                        </Row>

                    </Col>
                </Row>
            </div>
        );
    }

}
export default ComparePhones;