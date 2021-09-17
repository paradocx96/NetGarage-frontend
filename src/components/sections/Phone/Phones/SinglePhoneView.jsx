import React from "react";
import PhoneService from "../../../../services/PhoneService";
import {Card, Col, Row, Table} from "react-bootstrap";
import PhoneChipsetService from "../../../../services/PhoneChipsetService";
// import data from "bootstrap/js/src/dom/data";
import Lightbox from "react-image-lightbox";

class SinglePhoneView extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.isOpen = false;

    }

    initialState={
        id:'',
        phone:'',
        chipset:'',
        chipsetArray:[]
    }

    componentDidMount = async () => {
        let id = this.props.match.params.id;
        console.log("Recieved ID : ",id);
        this.setState({id: id});

        await PhoneService.getPhoneById(id)
            .then(response => response.data)
            .then((data) => {
                this.setState({phone: data});
            }).catch(error => {
                console.log("Cannot get phone for id. Error: ",error);
            });



        await PhoneChipsetService.getChipsetByBrandModel(this.state.phone.chipset)
            .then(response => response.data)
            .then((data) => {
                this.setState({chipsetArray:data});

                if (this.state.chipsetArray.length != 0){
                    console.log("Array is not empty");
                    this.setState({chipset:data[0]});
                    console.log(this.state.chipset.brandmodel);
                }
                else {
                    console.log("Array is Empty");
                }
            }).catch(error => {
                console.log("Cannot get chipset for brand. Error : ",error);
            })

    }

    handleImageClick = () =>{
        this.setState({isOpen:true});
    }

    closeLightBox = () => {
        this.setState({isOpen:false});
    }

    render() {
        const {brandmodel, brand,image, network,
            dimensions, weight,sim,
            displaytype, displaysize, displayresolution, displayprotection,
            os, softwarefeatures,
            chipset,
            memorystorage,card,
            maincamera, maincameraDetails, maincameraVideo, maincameraFeatures,
            selfcamera, selfcameraDetails, selfcameraVideo, selfcameraFeatures,
            loudspeaker, headphonejack,
            wlan, bluetooth, gps, nfc, radio,
            sensors,
            batterytype, charging,
            colors,models,sar
        }
            =  this.state.phone;
        return (
            <div className={'container-fluid'}>
                <h2>{this.state.phone.brandmodel}</h2>

                <Card>
                    <Card.Body className={'bg-success text-white'}>
                        <Row>
                            <Col>
                                <img
                                    onClick={this.handleImageClick}
                                    width={'150'} height={'200'}
                                    src={image || "http://via.placeholder.com/300x200"} alt={'firebase-image'}

                                />
                            </Col>

                            <Col>
                                {/*<Card.Header className={'bg-primary'}><h5>Display</h5></Card.Header>*/}
                                <Card.Body>
                                    <h5>Display</h5>
                                    {displaysize}
                                </Card.Body>

                                <Card.Body>
                                    <h5>Chipset</h5>
                                    {chipset}
                                </Card.Body>
                            </Col>
                            <Col>

                                <Card.Body>
                                    <h5>Storage</h5>
                                    {memorystorage}
                                </Card.Body>

                                <Card.Body>
                                    <h5>Battery</h5>
                                    {batterytype}
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                <br/>
                <Card className={'bg-transparent'}>
                    <Card.Header className={'bg-success text-white'}>
                        Network
                    </Card.Header>

                    <Card.Body>
                        <Table striped bordered hover variant={'light'}>
                            <tbody>

                            <tr>
                                <td>Technology</td>
                                <td>{network}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

                <br/>
                <Card className={'bg-transparent'}>
                    <Card.Header className={'bg-success text-white'}>
                        Body
                    </Card.Header>

                    <Card.Body>
                        <Table striped bordered hover variant={'light'}>
                            <tbody>

                            <tr>
                                <td>Dimensions</td>
                                <td>{dimensions}</td>
                            </tr>
                            <tr>
                                <td>Weight</td>
                                <td>{weight}</td>
                            </tr>
                            <tr>
                                <td>SIM</td>
                                <td>{sim}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

                <br/>
                <Card className={'bg-transparent'}>
                    <Card.Header className={'bg-success text-white'}>
                        Display
                    </Card.Header>

                    <Card.Body>
                        <Table striped bordered hover variant={'light'}>
                            <tbody>

                            <tr>
                                <td>Type</td>
                                <td>{displaytype}</td>
                            </tr><tr>
                                <td>Size</td>
                                <td>{displaysize}</td>
                            </tr>
                            <tr>
                                <td>Resolution</td>
                                <td>{displayresolution}</td>
                            </tr>
                            <tr>
                                <td>Protection</td>
                                <td>{displayprotection}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

                <br/>
                <Card className={'bg-transparent'}>
                    <Card.Header className={'bg-success text-white'}>
                        Software
                    </Card.Header>

                    <Card.Body>
                        <Table striped bordered hover variant={'light'}>
                            <tbody>

                            <tr>
                                <td>OS</td>
                                <td>{os}</td>
                            </tr>
                            <tr>
                                <td>Software Features</td>
                                <td>{softwarefeatures}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

                <br/>
                <Card className={'bg-transparent'}>
                    <Card.Header className={'bg-success text-white'}>
                        Chipset
                    </Card.Header>

                    <Card.Body>
                        <Table striped bordered hover variant={'light'}>
                            <tbody>

                            <tr>
                                <td>Chipset Brand and Model</td>
                                <td>{chipset}</td>
                            </tr>
                            <tr>
                                <td>CPU</td>
                                <td>{this.state.chipset.cpu}</td>
                            </tr>
                            <tr>
                                <td>GPU</td>
                                <td>{this.state.chipset.gpu}</td>
                            </tr>
                            <tr>
                                <td>LithoGraphy</td>
                                <td>{this.state.chipset.lithography}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

                <br/>
                <Card className={'bg-transparent'}>
                    <Card.Header className={'bg-success text-white'}>
                        Storage
                    </Card.Header>

                    <Card.Body>
                        <Table striped bordered hover variant={'light'}>
                            <tbody>

                            <tr>
                                <td>Memory and Storage</td>
                                <td>{memorystorage}</td>
                            </tr>
                            {/*<tr>
                                <td>CPU</td>
                                <td>{this.state.chipset.cpu}</td>
                            </tr>*/}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

                <br/>
                <Card className={'bg-transparent'}>
                    <Card.Header className={'bg-success text-white'}>
                        Main Camera
                    </Card.Header>

                    <Card.Body>
                        <Table striped bordered hover variant={'light'}>
                            <tbody>

                            <tr>
                                <td>Type</td>
                                <td>{maincamera}</td>
                            </tr><tr>
                                <td>Details</td>
                                <td>{maincameraDetails}</td>
                            </tr>
                            <tr>
                                <td>Video</td>
                                <td>{maincameraVideo}</td>
                            </tr>
                            <tr>
                                <td>Features</td>
                                <td>{maincameraFeatures}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>


                <br/>
                <Card className={'bg-transparent'}>
                    <Card.Header className={'bg-success text-white'}>
                        Selfie Camera
                    </Card.Header>

                    <Card.Body>
                        <Table striped bordered hover variant={'light'}>
                            <tbody>

                            <tr>
                                <td>Type</td>
                                <td>{selfcamera}</td>
                            </tr><tr>
                                <td>Details</td>
                                <td>{selfcameraDetails}</td>
                            </tr>
                            <tr>
                                <td>Video</td>
                                <td>{selfcameraVideo}</td>
                            </tr>
                            <tr>
                                <td>Features</td>
                                <td>{selfcameraFeatures}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

                <br/>
                <Card className={'bg-transparent'}>
                    <Card.Header className={'bg-success text-white'}>
                        Audio
                    </Card.Header>

                    <Card.Body>
                        <Table striped bordered hover variant={'light'}>
                            <tbody>

                            <tr>
                                <td>Loudspeaker</td>
                                <td>{loudspeaker}</td>
                            </tr><tr>
                                <td>Head Phone Jack</td>
                                <td>{headphonejack}</td>
                            </tr>

                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

                <br/>
                <Card className={'bg-transparent'}>
                    <Card.Header className={'bg-success text-white'}>
                        Communications
                    </Card.Header>

                    <Card.Body>
                        <Table striped bordered hover variant={'light'}>
                            <tbody>

                            <tr>
                                <td>WLAN</td>
                                <td>{wlan}</td>
                            </tr><tr>
                                <td>Bluetooth</td>
                                <td>{bluetooth}</td>
                            </tr>
                            <tr>
                                <td>GPS</td>
                                <td>{gps}</td>
                            </tr>
                            <tr>
                                <td>NFC</td>
                                <td>{nfc}</td>
                            </tr>
                            <tr>
                                <td>Radio</td>
                                <td>{radio}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

                <br/>
                <Card className={'bg-transparent'}>
                    <Card.Header className={'bg-success text-white'}>
                        Sensors
                    </Card.Header>

                    <Card.Body>
                        <Table striped bordered hover variant={'light'}>
                            <tbody>

                            <tr>
                                <td>Sensors</td>
                                <td>{sensors}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

                <br/>
                <Card className={'bg-transparent'}>
                    <Card.Header className={'bg-success text-white'}>
                        Battery
                    </Card.Header>

                    <Card.Body>
                        <Table striped bordered hover variant={'light'}>
                            <tbody>

                            <tr>
                                <td>Battery Type and Capacity</td>
                                <td>{batterytype}</td>
                            </tr><tr>
                                <td>Charging</td>
                                <td>{charging}</td>
                            </tr>

                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

                <br/>
                <Card className={'bg-transparent'}>
                    <Card.Header className={'bg-success text-white'}>
                        Miscellaneous
                    </Card.Header>

                    <Card.Body>
                        <Table striped bordered hover variant={'light'}>
                            <tbody>

                            <tr>
                                <td>Colors</td>
                                <td>{colors}</td>
                            </tr>
                            <tr>
                                <td>Models</td>
                                <td>{models}</td>
                            </tr>
                            <tr>
                                <td>SAR</td>
                                <td>{sar}</td>
                            </tr>

                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

                <br/>

                {
                    this.state.isOpen &&(
                        <Lightbox
                            mainSrc={image || "http://via.placeholder.com/300x200"}
                            onCloseRequest={this.closeLightBox}

                        />
                    )
                }


            </div>
        );
    }

}

export default SinglePhoneView;