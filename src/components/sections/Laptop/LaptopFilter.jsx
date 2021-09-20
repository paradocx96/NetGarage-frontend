import React, {Component} from 'react';
import {Button, ButtonGroup, Container} from "react-bootstrap";

import LaptopFinderBodyWall from "../../layouts/Laptop/LaptopFinderBodyWall";

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

    render() {
        return (
            <div style={this.divBack}>
                <LaptopFinderBodyWall/>
                <Container>
                    <ButtonGroup size="lg" className="mb-2">
                        <Button id={'brand'} onClick={this.onChange}>Filter By Brand</Button>
                        <Button id={'ram'} onClick={this.onChange}>Filter By RAM Capacity</Button>
                        <Button id={'processor'} onClick={this.onChange}>Filter By Processor Name</Button>
                    </ButtonGroup>

                    <p>{this.state.filterOption}</p>
                </Container>
            </div>
        );
    }
}

export default LaptopFilter;