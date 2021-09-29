import React, {Component} from 'react';
import {Carousel, Container, Tab, Table, Tabs} from "react-bootstrap";
import ServiceLaptop from "../../../services/ServiceLaptop";
import ServiceLaptopImage from "../../../services/ServiceLaptopImage";
import { withRouter } from 'react-router-dom';
import LaptopSingleViewBodyWall from "../../layouts/Laptop/LaptopSingleViewBodyWall";
import Footer from "../../layouts/Footer/Footer";
import AddFeedback from "../UserFeedback/AddFeedback";
import ViewFeedback from "../UserFeedback/ViewFeedback";

class LaptopHomepageSingleView extends Component {

    // STYLES
    divBack = {
        backgroundColor: '#212121'
    }

    divConBack = {
        backgroundColor: '#263238',
        color: 'white',
        paddingTop: '20px',
        paddingBottom: '20px'
    }

    imageCss = {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '50%'
    }

    imageCaroBox = {
        color: '#000000',
        margin: '20px',
        padding: '20px',
        borderRadius: '25px',
        backgroundColor: '#ffffff'
    }

    summaryBox = {
        color: '#000000',
        textAlign: 'center',
        margin: '20px',
        padding: '20px',
        borderRadius: '25px',
        backgroundColor: '#ffffff'
    }

    smallImgView = {
        borderRadius: '25px',
        backgroundColor: '#ffffff',
        width: '275px',
        padding: '10px'
    }

    tableView = {
        borderRadius: '25px',
        backgroundColor: '#ffffff',
        padding: '10px'
    }

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            LaptopList: [],
            imageList: []
        }
    }

    componentDidMount = async ()=>{
        const {match: {params}} = this.props;
        await this.fetch(params.id);
    }

    componentDidUpdate = async () => {
        const {match: {params}} = this.props;
        const prevID = this.state.id
        const currentID = params.id;
        if(currentID && currentID !="" && prevID != currentID){
            await this.fetch(currentID);
        }
    }

    fetch = async (id)=>{
        this.setState({
            id
        });

        await ServiceLaptop.getLaptopObjectById(id)
            .then(response => response.data)
            .then((data) => {
                this.setState({LaptopList: data});
            }).catch(error =>
                console.log(error.message)
            );

        await ServiceLaptopImage.getLaptopImageByLaptopId(id)
            .then(response => {
                this.setState({
                    imageList: response.data.link
                })
            })
            .catch(function (error) {
                console.log(error.message);
            });
    }

    render() {
        return (
            <div style={this.divBack}>
                <LaptopSingleViewBodyWall/>
                <Container style={this.divConBack}>

                    <h1>{this.state.LaptopList.brand + ' ' +
                    this.state.LaptopList.name + ' ' +
                    this.state.LaptopList.model + ' (' +
                    this.state.LaptopList.year + ')'}
                    </h1>

                    {/*<div style={this.smallImgView}>*/}
                    {/*    <img style={{width: "250px"}}*/}
                    {/*         src={this.state.LaptopList.image}*/}
                    {/*         alt="firebase-image"*/}
                    {/*    />*/}
                    {/*</div>*/}

                    <Tabs defaultActiveKey="overview" id="uncontrolled-tab-example" className="mb-3 m-5">
                        <Tab eventKey="overview" title="OVERVIEW">
                            <div style={this.imageCaroBox}>
                                <Carousel>
                                    {
                                        this.state.imageList.length === 0 ?
                                            <h5>No results</h5> :
                                            this.state.imageList.map((url, i) => (
                                                <Carousel.Item key={i}>
                                                    <div style={this.imageCss}>
                                                        <img
                                                            style={{width: "500px"}}
                                                            src={url || 'http://via.placeholder.com/300'}
                                                            alt="firebase-image"
                                                        />
                                                    </div>
                                                </Carousel.Item>
                                            ))
                                    }
                                </Carousel>
                            </div>

                            <div style={this.summaryBox}>
                                <div className={'row'}>
                                    <div className={'col'}>
                                        <h5>CPU</h5>
                                    </div>
                                    <div className={'col'}>
                                        <h5>MEMORY</h5>
                                    </div>
                                    <div className={'col'}>
                                        <h5>STORAGE</h5>
                                    </div>
                                    <div className={'col'}>
                                        <h5>GRAPHICS</h5>
                                    </div>
                                </div>
                                <div className={'row'}>
                                    <div className={'col'}>
                                        <h6>{this.state.LaptopList.processorname + ' ' +
                                        this.state.LaptopList.processorgeneration + ' ' +
                                        this.state.LaptopList.processordetails}</h6>
                                    </div>
                                    <div className={'col'}>
                                        <h6>{this.state.LaptopList.ramtype + ' ' +
                                        this.state.LaptopList.ramcapacity + ' ' +
                                        this.state.LaptopList.ramslotstype + ' Slots ' +
                                        this.state.LaptopList.ramslotscount}</h6>
                                    </div>
                                    <div className={'col'}>
                                        <h6>{this.state.LaptopList.storagefirst + ' ' +
                                        this.state.LaptopList.storagefirstcapacity + '\n' +
                                        this.state.LaptopList.storagesecond + ' ' +
                                        this.state.LaptopList.storagesecondcapacity}</h6>
                                    </div>
                                    <div className={'col'}>
                                        <h6>{this.state.LaptopList.graphicbrand + ' ' +
                                        this.state.LaptopList.graphicmodel + ' ' +
                                        this.state.LaptopList.graphiccapacity + ' ' +
                                        this.state.LaptopList.graphicdetails}</h6>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="processor" title="SPECIFICATIONS">
                            <div style={this.tableView}>
                                <Table striped bordered hover>
                                    {/*<thead>*/}
                                    {/*<tr>*/}
                                    {/*    <th>#</th>*/}
                                    {/*    <th>##</th>*/}
                                    {/*</tr>*/}
                                    {/*</thead>*/}
                                    <tbody>
                                    <tr>
                                        <td>CPU</td>
                                        <td>
                                            {this.state.LaptopList.processorname + ' ' +
                                            this.state.LaptopList.processorgeneration + ' ' +
                                            this.state.LaptopList.processordetails}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>OS</td>
                                        <td>
                                            {this.state.LaptopList.os}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>DISPLAY</td>
                                        <td>
                                            {this.state.LaptopList.displaytype + ' ' +
                                            this.state.LaptopList.displaysizeresolution + ' ' +
                                            this.state.LaptopList.displayrefreshrate}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>CHIPSET</td>
                                        <td>
                                            {this.state.LaptopList.chipset}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>GRAPHICS</td>
                                        <td>
                                            {this.state.LaptopList.graphicbrand + ' ' +
                                            this.state.LaptopList.graphicmodel + ' ' +
                                            this.state.LaptopList.graphiccapacity + ' ' +
                                            this.state.LaptopList.graphicdetails}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>MEMORY</td>
                                        <td>
                                            {this.state.LaptopList.ramtype + ' ' +
                                            this.state.LaptopList.ramcapacity + ' ' +
                                            this.state.LaptopList.ramslotstype + ' Slots ' +
                                            this.state.LaptopList.ramslotscount}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>STORAGE</td>
                                        <td>
                                            {this.state.LaptopList.storagefirst + ' ' +
                                            this.state.LaptopList.storagefirstcapacity + ' ' +
                                            this.state.LaptopList.storagesecond + ' ' +
                                            this.state.LaptopList.storagesecondcapacity}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>I/O PORTS</td>
                                        <td>
                                            {this.state.LaptopList.ioports}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>WEBCAM</td>
                                        <td>
                                            {this.state.LaptopList.webcam}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>KEYBOARD</td>
                                        <td>
                                            {this.state.LaptopList.keyboard}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>COMMUNICATION</td>
                                        <td>
                                            {this.state.LaptopList.communication}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AUDIO</td>
                                        <td>
                                            {this.state.LaptopList.audio}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>BATTERY</td>
                                        <td>
                                            {this.state.LaptopList.battery}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>DIMENSION(WxDxH)</td>
                                        <td>
                                            {this.state.LaptopList.dimension}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>WEIGHT(W/BATTERY)</td>
                                        <td>
                                            {this.state.LaptopList.weight}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>COLOR</td>
                                        <td>
                                            {this.state.LaptopList.color}
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Tab>
                        <Tab eventKey="gallery" title="GALLERY">
                            <div style={this.imageCaroBox}>
                                <div>
                                    {
                                        this.state.imageList.length === 0 ?
                                            <h5>No results</h5> :
                                            this.state.imageList.map((url, i) => (
                                                <img
                                                    key={i}
                                                    style={{width: "500px"}}
                                                    src={url || 'http://via.placeholder.com/300'}
                                                    alt="firebase-image"
                                                />
                                            ))
                                    }
                                </div>
                            </div>
                        </Tab>

                        <Tab eventKey="addComment" title="COMMENTS">
                            <div style={this.summaryBox}>
                                <ViewFeedback parentDeviceID={this.state.id}/>
                            </div>
                            <div style={this.summaryBox}>
                                <AddFeedback parentDeviceID={this.state.id}/>
                            </div>
                        </Tab>
                    </Tabs>
                </Container>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(LaptopHomepageSingleView);