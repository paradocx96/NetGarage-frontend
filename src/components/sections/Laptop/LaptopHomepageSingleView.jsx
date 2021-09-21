import React, {Component} from 'react';
import ServiceLaptop from "../../../services/ServiceLaptop";

import LaptopSingleViewBodyWall from "../../layouts/Laptop/LaptopSingleViewBodyWall";
import {Container, Table} from "react-bootstrap";
import Footer from "../../layouts/Footer/Footer";

class LaptopHomepageSingleView extends Component {

    // STYLES
    divBack = {
        backgroundColor: '#212121'
    }

    divConBack = {
        backgroundColor: '#263238',
        color: 'white'
    }

    // TODO: Initializing state values and functions
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            LaptopList: []
        }
    }

    componentDidMount = async () => {
        const {match: {params}} = this.props;
        this.setState({
            id: params.id
        });

        await ServiceLaptop.getLaptopObjectById(params.id)
            .then(response => response.data)
            .then((data) => {
                console.log(data);
                this.setState({LaptopList: data});
            }).catch(error =>
                console.log(error.message)
            );
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

                    <img style={{width: "250px"}}
                         src={this.state.LaptopList.image}
                         alt="firebase-image"
                    />

                    <Table striped bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>##</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>CPU</td>
                            <td>
                                {this.state.LaptopList.processorname + ' ' +
                                this.state.LaptopList.processorgeneration + ' ' +
                                this.state.LaptopList.processordetails }
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
                                this.state.LaptopList.graphicdetails }
                            </td>
                        </tr>
                        <tr>
                            <td>MEMORY</td>
                            <td>
                                {this.state.LaptopList.ramtype + ' ' +
                                this.state.LaptopList.ramcapacity  + ' ' +
                                this.state.LaptopList.ramslotstype  + ' Slots ' +
                                this.state.LaptopList.ramslotscount }
                            </td>
                        </tr>
                        <tr>
                            <td>STORAGE</td>
                            <td>
                                {this.state.LaptopList.storagefirst + ' ' +
                                this.state.LaptopList.storagefirstcapacity  + ' ' +
                                this.state.LaptopList.storagesecond  + ' ' +
                                this.state.LaptopList.storagesecondcapacity }
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
                </Container>
                <Footer/>
            </div>
        );
    }
}

export default LaptopHomepageSingleView;