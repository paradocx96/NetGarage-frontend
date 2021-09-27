import React, {Component} from 'react';
import {Button, ButtonGroup, Container} from "react-bootstrap";

import LaptopFinderBodyWall from "../../layouts/Laptop/LaptopFinderBodyWall";
import LaptopFilterBrand from "./LaptopFilterBrand";
import LaptopFilterRam from "./LaptopFilterRam";
import LaptopFilterProcessor from "./LaptopFilterProcessor";
import Footer from "../../layouts/Footer/Footer";

class LaptopFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterOption: 'brand'
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange = (event) => {
        this.setState({filterOption: event.target.id});
    }

    divBack = {
        backgroundColor: '#212121'
    }

    divFilter = {
        backgroundColor: '#263238'
    }

    divSec = {
        height: '20px'
    }

    render() {
        return (
            <div style={this.divBack}>
                <LaptopFinderBodyWall/>
                <div>
                    <Container>
                        <div style={this.divSec}/>
                        <ButtonGroup size="lg" className="mb-2">
                            <Button id={'brand'} onClick={this.onChange}>Find By Brand</Button>
                            <Button id={'ram'} onClick={this.onChange}>Find By RAM Capacity</Button>
                            <Button id={'processor'} onClick={this.onChange}>Find By Processor</Button>
                        </ButtonGroup>
                        <div style={this.divSec}/>
                        <div style={this.divFilter}>
                            {
                                this.state.filterOption === 'brand' ?
                                    <LaptopFilterBrand/> :
                                    this.state.filterOption === 'ram' ?
                                        <LaptopFilterRam/> :
                                        this.state.filterOption === 'processor' ?
                                            <LaptopFilterProcessor/> :
                                            <h5>Select Filter Type</h5>
                            }
                        </div>
                    </Container>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default LaptopFilter;