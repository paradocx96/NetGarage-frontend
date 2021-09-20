import React, {Component} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import '../../../assets/style/laptop/LaptopList.css';

import ServiceLaptopBrand from "../../../services/ServiceLaptopBrand";
import ServiceLaptop from "../../../services/ServiceLaptop";
import {Link} from "react-router-dom";

class LaptopFilterBrand extends Component {

    constructor(props) {
        super(props);
        this.state = {
            brandList: [],
            brand: '',
            laptopList: '',
            filterInitiated: false
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onSelectBrand = this.onSelectBrand.bind(this);
    }

    componentDidMount = async () => {
        // TODO: GET ALL LAPTOP BRAND
        await ServiceLaptopBrand.getLaptopBrand()
            .then(response => response.data)
            .then((data) => {
                this.setState({brandList: data});
            }).catch(error =>
                console.log(error.message)
            );
    }

    // TODO: Assign Brand values to State variables
    onSelectBrand = (event) => {
        this.setState({brand: event.target.value});
    }

    // TODO: Submit form values
    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({filterInitiated: true});

        await ServiceLaptop.getLaptopByBrand(this.state.brand)
            .then(response => response.data)
            .then((data) => {
                console.log(data);
                this.setState({laptopList: data});
            }).catch(error =>
                console.log(error.message)
            );
    }

    divBox = {
        color: '#ffffff'
    }

    divBoxNew = {
        height: '50px'
    }

    divBoxNewTwo = {
        height: '20px'
    }

    divSecOne = {
        padding: '20px'
    }

    divSecTwo = {
        minHeight: '400px'
    }

    render() {
        return (
            <Container style={this.divBox}>
                <div style={this.divBoxNewTwo}/>

                <section style={this.divSecOne}>
                    <h3>Laptop Find By Brand</h3>
                    <div style={this.divBoxNew}/>

                    <Form onSubmit={this.onSubmit.bind(this)}>
                        <Form.Group as={Row} controlId="Name">
                            <Col sm={4}>
                                <Form.Control required as="select"
                                              name={'brand'}
                                              value={this.state.brand}
                                              onChange={this.onSelectBrand}>

                                    <option>Brand</option>
                                    {this.state.brandList.map(item => (
                                        <option key={item.id} value={item.name}>
                                            {item.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                            <Col>
                                <Button type="submit" className="btn-success">FIND</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </section>

                <div style={this.divBoxNew}/>

                <section style={this.divSecTwo}>
                    <div id="laptopList">
                        {
                            this.state.filterInitiated === false ?
                                <h5>Filter to get results</h5> :
                                this.state.laptopList.length === 0 ?
                                    <p>No results</p> :
                                    this.state.laptopList.map((laptop) => (
                                        <Link to={`/laptops-view/` + laptop.id}
                                              key={laptop.id}
                                              style={{textDecoration: 'none'}}>
                                            <div className="cardItem">
                                                <img style={{height: "280px"}} src={laptop.image} alt={'LaptopImage'}/>
                                                <div className="content">
                                                    <h5>{laptop.brand + ' ' + laptop.name + ' ' + laptop.graphicmodel}</h5>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                        }
                    </div>
                </section>
            </Container>
        );
    }
}

export default LaptopFilterBrand;