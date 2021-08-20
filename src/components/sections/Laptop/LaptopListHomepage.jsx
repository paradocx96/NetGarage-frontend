import React, {Component} from 'react';
import {Card, Container} from "react-bootstrap";

import ServiceLaptop from "../../../services/ServiceLaptop";
import LaptopArt from './../../../assets/images/Laptop/laptopSample.jpg';

class LaptopListHomepage extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        laptopList: []
    }

    componentDidMount = async () => {
        await ServiceLaptop.getLaptopByStatus('Activate')
            .then(response => response.data)
            .then((data) => {
                this.setState({laptopList: data});
            }).catch(error =>
                console.log(error.message)
            );
    }

    divBack = {
        'background-color': '#263238',
        color: 'white'
    }

    divLap = {
        color: 'black',
        width: '30%'
    }

    divBox = {
        height: '50px'
    }

    render() {
        return (
            <Container style={this.divBack}>
                <div style={this.divBox}/>
                {
                    this.state.laptopList.length === 0 ?
                        <p>Loading...</p>
                        :
                        this.state.laptopList.map((laptop) => (
                            <Card style={this.divLap} key={laptop.id}>
                                <Card.Body>
                                    <Card.Img variant="top" src={LaptopArt}/>
                                    <Card.Title>{laptop.brand + ' ' + laptop.name + ' ' + laptop.graphicmodel}</Card.Title>
                                </Card.Body>
                            </Card>
                        ))
                }
                <div style={this.divBox}/>
            </Container>
        );
    }
}

export default LaptopListHomepage;